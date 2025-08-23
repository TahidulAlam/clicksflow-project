"use client";

import { useState, useMemo, useCallback } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import OptionsList from "./OptionsList";
import ListSection from "./ListSection";
import {
  CHARACTERISTICS,
  Characteristic,
  DEFAULT_VALUES,
  GEOLOCATION,
  Geolocation,
} from "./constants";
import FilterCategoryList from "./CharacteristicsList";
import TextInput from "@/components/shared/forms/TextInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import TrafficFilteringModal, {
  TargetFilteringData,
  formSchema as eventFormSchema,
} from "./TrafficFilteringModal";
import FlexRow from "@/components/shared/responsibeForm/FlexRow";

// Schema for the main form
const formSchema = z.object({
  zipPostalCode: z
    .string()
    .min(2, "ZIP/Postal code must be at least 2 characters")
    .max(50, "ZIP/Postal code must be at most 50 characters"),
  ipCode: z
    .string()
    .min(2, "IP must be at least 2 characters")
    .max(50, "IP must be at most 50 characters"),
  ipCodeFrom: z
    .string()
    .min(2, "IP From must be at least 2 characters")
    .max(50, "IP From must be at most 50 characters"),
  ipCodeTo: z
    .string()
    .min(2, "IP To must be at least 2 characters")
    .max(50, "IP To must be at most 50 characters"),
  connectionType: z.string().min(1, "Connection Type is required"),
  matchType: z.enum(["exact", "range"], {
    required_error: "Match Type is required",
  }),
  included: z.record(z.array(z.string())),
  excluded: z.record(z.array(z.string())),
  enableBlockProxy: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

const connectionTypeOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const matchTypeOptions = [
  { value: "exact", label: "Exact" },
  { value: "range", label: "Range" },
];

// IPv4 validation regex
const isValidIPv4 = (ip: string): boolean => {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
};

export default function TargetingForm() {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<TargetFilteringData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [activeCharacteristic, setActiveCharacteristic] =
    useState<Characteristic | null>(null);
  const [activeGeolocation, setActiveGeolocation] =
    useState<Geolocation | null>(null);
  const [search, setSearch] = useState("");
  const [showInc, setShowInc] = useState(false);
  const [showExc, setShowExc] = useState(false);

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      zipPostalCode: "",
      ipCode: "",
      ipCodeFrom: "",
      ipCodeTo: "",
      connectionType: "",
      matchType: "exact",
      enableBlockProxy: false,
      included: DEFAULT_VALUES.included,
      excluded: DEFAULT_VALUES.excluded,
    },
    resolver: zodResolver(formSchema),
  });

  const currentIncluded = useWatch({
    control,
    name: activeGeolocation ? `included.${activeGeolocation}` : `included.IP`,
    defaultValue: [],
  });

  const currentExcluded = useWatch({
    control,
    name: activeGeolocation ? `excluded.${activeGeolocation}` : `excluded.IP`,
    defaultValue: [],
  });

  const matchType = useWatch({
    control,
    name: "matchType",
    defaultValue: "exact",
  });

  const ipCode = watch("ipCode");
  const ipCodeFrom = watch("ipCodeFrom");
  const ipCodeTo = watch("ipCodeTo");

  const options = useMemo(
    () =>
      activeCharacteristic
        ? CHARACTERISTICS[activeCharacteristic]
        : CHARACTERISTICS["Device type"],
    [activeCharacteristic]
  );

  const handleAdd = useCallback(
    (value: string, type: "include" | "exclude") => {
      const geoKey = activeGeolocation || "IP";
      const path = `${type}d.${geoKey}` as const;
      const oppositePath = `${
        type === "include" ? "excluded" : "included"
      }.${geoKey}` as const;

      const current = type === "include" ? currentIncluded : currentExcluded;
      const opposite = type === "include" ? currentExcluded : currentIncluded;

      if (!current.includes(value)) {
        setValue(path, [...current, value]);
        setValue(
          oppositePath,
          opposite.filter((v) => v !== value)
        );
      }
    },
    [activeGeolocation, currentIncluded, currentExcluded, setValue]
  );

  const handleRemove = useCallback(
    (value: string, from: "included" | "excluded") => {
      const geoKey = activeGeolocation || "IP";
      const path = `${from}.${geoKey}` as const;
      const current = from === "included" ? currentIncluded : currentExcluded;
      setValue(
        path,
        current.filter((v) => v !== value)
      );
    },
    [activeGeolocation, currentIncluded, currentExcluded, setValue]
  );

  const handleShowList = useCallback((type: "include" | "exclude") => {
    if (type === "include") {
      setShowInc(true);
    } else if (type === "exclude") {
      setShowExc(true);
    }
  }, []);

  const handleIpAction = useCallback(
    (type: "include" | "exclude") => {
      if (matchType === "exact") {
        if (!ipCode) {
          toast.error("Please enter an IP address");
          return;
        }
        if (!isValidIPv4(ipCode)) {
          toast.error("Invalid IP address");
          return;
        }
        handleAdd(ipCode, type);
        setValue("ipCode", "");
      } else if (matchType === "range") {
        if (!ipCodeFrom || !ipCodeTo) {
          toast.error("Please enter both IP From and IP To");
          return;
        }
        if (!isValidIPv4(ipCodeFrom) || !isValidIPv4(ipCodeTo)) {
          toast.error("Invalid IP address range");
          return;
        }
        const rangeValue = `${ipCodeFrom}-${ipCodeTo}`;
        handleAdd(rangeValue, type);
        setValue("ipCodeFrom", "");
        setValue("ipCodeTo", "");
      }
      handleShowList(type);
    },
    [
      matchType,
      ipCode,
      ipCodeFrom,
      ipCodeTo,
      handleAdd,
      setValue,
      handleShowList,
    ]
  );

  const handleAddOrEditEvent = (event: TargetFilteringData) => {
    try {
      const validatedEvent = eventFormSchema.parse(event);
      if (editingIndex !== null) {
        setEvents((prev) =>
          prev.map((e, idx) => (idx === editingIndex ? validatedEvent : e))
        );
        toast.success("Event updated successfully!");
        setEditingIndex(null);
      } else {
        setEvents((prev) => [...prev, validatedEvent]);
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Event validation failed:", error);
      toast.error("Failed to add/edit event. Please check the form data.");
    } finally {
      setIsEventModalOpen(false);
    }
  };

  const handleEditEvent = useCallback(
    (index: number) => {
      if (index >= 0 && index < events.length) {
        console.log("Editing event at index:", index, "Event:", events[index]);
        setEditingIndex(index);
        setIsEventModalOpen(true);
      } else {
        console.error("Invalid edit index:", index);
        toast.error("Cannot edit event: Invalid index");
      }
    },
    [events]
  );

  const handleDeleteEvent = useCallback(
    (index: number) => {
      if (index >= 0 && index < events.length) {
        console.log("Deleting event at index:", index, "Event:", events[index]);
        setEvents((prev) => {
          const newEvents = prev.filter((_, idx) => idx !== index);
          console.log("Events after deletion:", newEvents);
          return newEvents;
        });
        toast.success("Event deleted successfully!");
      } else {
        console.error("Invalid delete index:", index);
        toast.error("Cannot delete event: Invalid index");
      }
    },
    [events]
  );

  const onSubmit = (data: FormData) => {
    console.log("Submitted Targeting Data:", data);
    toast.success("Targeting form submitted! Check console for details.");
  };

  const renderOptionsList = (
    category: string,
    options: string[],
    currentIncluded: string[],
    currentExcluded: string[],
    search: string
  ) => (
    <OptionsList
      category={category}
      options={options}
      search={search}
      setSearch={setSearch}
      currentIncluded={currentIncluded}
      currentExcluded={currentExcluded}
      onAdd={handleAdd}
      onShowList={handleShowList}
    />
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="p-2">
        <div className="flex gap-2">
          <FilterCategoryList<Characteristic>
            title="Device Characteristics"
            items={Object.keys(CHARACTERISTICS) as Characteristic[]}
            active={activeCharacteristic}
            onSelect={(c: Characteristic) => {
              setActiveCharacteristic(c);
              setSearch("");
            }}
          />

          {activeCharacteristic && (
            <main className="w-3/4 flex justify-between gap-2">
              <div className="w-1/2">
                {renderOptionsList(
                  activeCharacteristic,
                  [...options],
                  currentIncluded,
                  currentExcluded,
                  search
                )}
              </div>

              <div className="mt-6 w-1/2 flex flex-col items-center gap-6">
                {showInc && (
                  <ListSection
                    type="included"
                    items={currentIncluded}
                    onRemove={handleRemove}
                  />
                )}
                {showExc && (
                  <ListSection
                    type="excluded"
                    items={currentExcluded}
                    onRemove={handleRemove}
                  />
                )}
              </div>
            </main>
          )}
        </div>

        <div className="flex gap-2 mt-5">
          <div className="w-1/6">
            <FilterCategoryList<Geolocation>
              title="Geolocation"
              items={Object.keys(GEOLOCATION) as Geolocation[]}
              active={activeGeolocation}
              onSelect={(c: Geolocation) => {
                setActiveGeolocation(c);
                setSearch("");
              }}
            />
          </div>

          {activeGeolocation && (
            <main className="w-5/6 flex justify-between gap-2">
              <div className="w-1/2">
                {renderOptionsList(
                  activeGeolocation,
                  [...(GEOLOCATION[activeGeolocation] || [])],
                  currentIncluded,
                  currentExcluded,
                  search
                )}
              </div>
            </main>
          )}
        </div>

        <FlexRow cols={{ base: 1, sm: 1, md: 1, lg: 2 }}>
          <TextInput
            name="zipPostalCode"
            label="ZIP/Postal Code"
            register={register}
            errors={errors}
            required
            disabled={isSubmitting}
          />

          <Controller
            name="connectionType"
            control={control}
            render={({ field }) => (
              <SingleSelect
                id="connectionType"
                label="Connection Type"
                showSearch={false}
                required
                options={connectionTypeOptions}
                placeholder="Select connection type"
                value={field.value}
                onChange={field.onChange}
                error={errors.connectionType}
                isDisabled={isSubmitting}
              />
            )}
          />
        </FlexRow>

        <div className="flex gap-2 mt-5">
          <div className="w-1/2">
            <Controller
              name="matchType"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  id="matchType"
                  label="Match Type"
                  required
                  showSearch={false}
                  options={matchTypeOptions}
                  placeholder="Select match type"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.matchType}
                  isDisabled={isSubmitting}
                />
              )}
            />
          </div>

          {matchType === "exact" && (
            <div className="flex gap-2">
              <div>
                <TextInput
                  name="ipCode"
                  label="IP"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-xs font-semibold">Action</h1>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-blue-100 rounded-lg border border-blue-950 text-blue-950"
                    type="button"
                    onClick={() => handleIpAction("exclude")}
                    disabled={isSubmitting}
                  >
                    -
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-950 rounded-lg border border-blue-950 text-white"
                    type="button"
                    onClick={() => handleIpAction("include")}
                    disabled={isSubmitting}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {matchType === "range" && (
            <div className="flex gap-2">
              <div className="flex gap-2">
                <TextInput
                  name="ipCodeFrom"
                  label="IP From"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
                <TextInput
                  name="ipCodeTo"
                  label="IP To"
                  register={register}
                  errors={errors}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div>
                  <h1 className="text-xs font-semibold">Action</h1>
                </div>
                <div className="flex gap-2">
                  <button
                    className="py-1.5 px-3 bg-blue-100 rounded-lg border border-blue-950 text-blue-950"
                    type="button"
                    onClick={() => handleIpAction("exclude")}
                    disabled={isSubmitting}
                  >
                    -
                  </button>
                  <button
                    className="py-1.5 px-3 bg-blue-950 rounded-lg border border-blue-950 text-white"
                    type="button"
                    onClick={() => handleIpAction("include")}
                    disabled={isSubmitting}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-5">
          <Controller
            control={control}
            name="enableBlockProxy"
            render={({ field }) => (
              <ToggleSwitch
                label="Block Proxy"
                checked={field.value}
                onChange={(value) => {
                  field.onChange(value);
                  if (value) {
                    setValue("excluded.IP", [
                      ...currentExcluded,
                      "Block Proxy: Proxy Traffic",
                    ]);
                  } else {
                    setValue(
                      "excluded.IP",
                      currentExcluded.filter(
                        (item) => item !== "Block Proxy: Proxy Traffic"
                      )
                    );
                  }
                }}
                disabled={isSubmitting}
                aria-label="Block Proxy"
              />
            )}
          />
        </div>

        <div className="mt-5">
          <table className="w-full max-w-xl text-left text-xs table-auto overflow-x-scroll mt-4">
            <thead className="bg-gray-100 text-gray-600 border border-gray-400">
              <tr>
                <th className="p-2">Parameter</th>
                <th className="p-2">Match Type</th>
                <th className="p-2">Value</th>
                <th className="p-2">Action</th>
                <th className="p-2">Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <tr key={`${event.name}-${idx}`} className="border-t">
                  <td className="p-2">{event.name}</td>
                  <td className="p-2">{event.matchType}</td>
                  <td className="p-2">-</td>
                  <td className="p-2">-</td>
                  <td className="p-2 flex gap-2">
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => handleEditEvent(idx)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-600 hover:underline"
                      onClick={() => handleDeleteEvent(idx)}
                      disabled={isSubmitting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5">
            <PrimaryBtn
              variant="primary"
              onClick={() => {
                console.log("Opening modal for new event");
                setIsEventModalOpen(true);
                setEditingIndex(null);
              }}
              disabled={isSubmitting}
            >
              + Add New
            </PrimaryBtn>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            className="bg-blue-950 text-white px-5 py-2 rounded hover:bg-blue-900 transition"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
      </form>
      <TrafficFilteringModal
        isOpen={isEventModalOpen}
        onClose={() => {
          console.log("Closing modal");
          setIsEventModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmitSuccess={handleAddOrEditEvent}
        defaultData={editingIndex !== null ? events[editingIndex] : undefined}
        isLoading={isSubmitting}
      />
    </div>
  );
}
