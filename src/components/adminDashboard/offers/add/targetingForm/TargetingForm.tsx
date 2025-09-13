/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useState, useMemo, useCallback } from "react";
import { z } from "zod";

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
import FormArea from "@/components/shared/forms/FormArea";
import FormActions from "@/components/shared/forms/FormActions";
import { UseFormReturn } from "react-hook-form";
import Container from "@/components/shared/container/Container";

const formSchema = z.object({
  zipPostalCode: z
    .string()
    .refine((val) => val === "" || (val.length >= 2 && val.length <= 50), {
      message: "ZIP/Postal code must be 2-50 characters if provided",
    }),
  connectionType: z.string().min(1, "Connection Type is required"),
  matchType: z.enum(["exact", "range"], {
    required_error: "Match Type is required",
  }),
  included: z.record(z.array(z.string())),
  excluded: z.record(z.array(z.string())),
  enableBlockProxy: z.boolean(),
});

type FormData = z.infer<typeof formSchema>;

type FormFieldPath =
  | keyof FormData
  | `included.${string}`
  | `excluded.${string}`;

const connectionTypeOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const matchTypeOptions = [
  { value: "exact", label: "Exact" },
  { value: "range", label: "Range" },
];

const isValidIPv4 = (ip: string): boolean => {
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip.trim());
};

const ipToNumber = (ip: string): number => {
  return ip.split(".").reduce((acc, oct) => acc * 256 + parseInt(oct), 0);
};

interface TargetingFormProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const TargetingForm: React.FC<TargetingFormProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
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

  const [ipCode, setIpCode] = useState("");
  const [ipCodeFrom, setIpCodeFrom] = useState("");
  const [ipCodeTo, setIpCodeTo] = useState("");

  const optionsForActiveCharacteristic = useMemo(() => {
    if (!activeCharacteristic) return CHARACTERISTICS["Device type"] || [];
    return CHARACTERISTICS[activeCharacteristic] || [];
  }, [activeCharacteristic]);

  const filteredOptions = useMemo(() => {
    if (!search) return optionsForActiveCharacteristic;

    const searchLower = search.toLowerCase();
    return optionsForActiveCharacteristic.filter((option) =>
      option.toLowerCase().includes(searchLower)
    );
  }, [optionsForActiveCharacteristic, search]);

  const geolocationOptions = useMemo(() => {
    if (!activeGeolocation) return [];
    return GEOLOCATION[activeGeolocation] || [];
  }, [activeGeolocation]);

  const filteredGeolocationOptions = useMemo(() => {
    if (!search) return geolocationOptions;

    const searchLower = search.toLowerCase();
    return geolocationOptions.filter((option) =>
      option.toLowerCase().includes(searchLower)
    );
  }, [geolocationOptions, search]);

  const handleAddOrEditEvent = useCallback(
    (event: TargetFilteringData) => {
      try {
        const validated = eventFormSchema.parse(event);
        if (editingIndex !== null) {
          setEvents((prev) =>
            prev.map((e, i) => (i === editingIndex ? validated : e))
          );
          setEditingIndex(null);
          toast.success("Event updated successfully!");
        } else {
          setEvents((prev) => [...prev, validated]);
          toast.success("Event added successfully!");
        }
      } catch (err) {
        toast.error("Failed to add/edit event. Please check the form data.");
      } finally {
        setIsEventModalOpen(false);
      }
    },
    [editingIndex]
  );

  const handleEditEvent = useCallback(
    (index: number) => {
      if (index < 0 || index >= events.length) {
        toast.error("Cannot edit: invalid index");
        return;
      }
      setEditingIndex(index);
      setIsEventModalOpen(true);
    },
    [events.length]
  );

  const handleDeleteEvent = useCallback(
    (index: number) => {
      if (index < 0 || index >= events.length) {
        toast.error("Cannot delete: invalid index");
        return;
      }
      if (!confirm("Are you sure you want to delete this event?")) {
        return;
      }
      setEvents((prev) => prev.filter((_, i) => i !== index));
      toast.success("Event deleted successfully!");
    },
    [events.length]
  );

  const onSubmitForm = useCallback(
    async (data: FormData) => {
      try {
        onSubmitSuccess?.();
        toast.success("Targeting saved");
      } catch (err) {
        toast.error("Failed to save targeting");
      }
    },
    [onSubmitSuccess]
  );

  return (
    <Container>
      <FormArea
        schema={formSchema}
        defaultValues={{
          zipPostalCode: "",
          connectionType: "",
          matchType: "exact",
          enableBlockProxy: false,
          included: DEFAULT_VALUES.included,
          excluded: DEFAULT_VALUES.excluded,
        }}
        onSubmit={onSubmitForm}
      >
        {(methods: UseFormReturn<FormData>) => {
          const {
            register,
            control,
            setValue,
            watch,
            reset,
            formState: { errors, isSubmitting },
          } = methods;

          const geoKey = activeGeolocation ?? "IP";
          const currentIncluded: string[] =
            watch(`included.${geoKey}` as const) || [];
          const currentExcluded: string[] =
            watch(`excluded.${geoKey}` as const) || [];
          const matchType: "exact" | "range" = watch("matchType") || "exact";
          const allIncluded = Object.values(watch("included") || {}).flat();

          const allExcluded = Object.values(watch("excluded") || {}).flat();

          const handleAdd = (value: string, type: "include" | "exclude") => {
            const trimmedValue = value.trim();
            if (!trimmedValue) return;
            const key = activeGeolocation ?? "IP";
            const targetPath: FormFieldPath = `${
              type === "include" ? "included" : "excluded"
            }.${key}`;
            const oppositePath: FormFieldPath = `${
              type === "include" ? "excluded" : "included"
            }.${key}`;
            const current =
              type === "include" ? currentIncluded : currentExcluded;
            const opposite =
              type === "include" ? currentExcluded : currentIncluded;
            if (!current.includes(trimmedValue)) {
              setValue(targetPath, [...current, trimmedValue]);
              setValue(
                oppositePath,
                opposite.filter((v) => v !== trimmedValue)
              );
            }
          };

          const handleRemove = (
            value: string,
            from: "included" | "excluded"
          ) => {
            const key = activeGeolocation ?? "IP";
            const path: FormFieldPath = `${from}.${key}`;
            const current =
              from === "included" ? currentIncluded : currentExcluded;
            setValue(
              path,
              current.filter((v) => v !== value)
            );
          };

          const handleShowList = (type: "include" | "exclude") => {
            if (type === "include") setShowInc(true);
            else setShowExc(true);
          };

          const handleIpAction = (type: "include" | "exclude") => {
            if (matchType === "exact") {
              if (!ipCode.trim()) {
                toast.error("Please enter an IP address");
                return;
              }
              if (!isValidIPv4(ipCode)) {
                toast.error("Invalid IP address");
                return;
              }
              handleAdd(ipCode, type);
              setIpCode("");
            } else {
              // range
              if (!ipCodeFrom.trim() || !ipCodeTo.trim()) {
                toast.error("Please enter both IP From and IP To");
                return;
              }
              if (!isValidIPv4(ipCodeFrom) || !isValidIPv4(ipCodeTo)) {
                toast.error("Invalid IP address range");
                return;
              }
              const fromNum = ipToNumber(ipCodeFrom.trim());
              const toNum = ipToNumber(ipCodeTo.trim());
              if (fromNum > toNum) {
                toast.error("IP From must be less than or equal to IP To");
                return;
              }
              const rangeValue = `${ipCodeFrom.trim()}-${ipCodeTo.trim()}`;
              handleAdd(rangeValue, type);
              setIpCodeFrom("");
              setIpCodeTo("");
            }
            handleShowList(type);
          };

          return (
            <>
              <div className="flex gap-2 ">
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
                      <OptionsList
                        category={activeCharacteristic}
                        options={Array.from(filteredOptions)}
                        search={search}
                        setSearch={setSearch}
                        currentIncluded={currentIncluded}
                        currentExcluded={currentExcluded}
                        onAdd={handleAdd}
                        onShowList={handleShowList}
                      />
                    </div>

                    <div className="mt-6 w-1/2  flex flex-col items-center gap-6">
                      <div className="mt-6 flex flex-col gap-6">
                        {allIncluded.length > 0 && (
                          <ListSection
                            type="included"
                            items={allIncluded}
                            onRemove={(v) => handleRemove(v, "included")}
                          />
                        )}

                        {allExcluded.length > 0 && (
                          <ListSection
                            type="excluded"
                            items={allExcluded}
                            onRemove={(v) => handleRemove(v, "excluded")}
                          />
                        )}
                      </div>
                    </div>
                  </main>
                )}
              </div>

              <div className="flex gap-2 mt-5">
                <div className="w-1/6 ">
                  <FilterCategoryList<Geolocation>
                    title="Geolocation"
                    items={Object.keys(GEOLOCATION) as Geolocation[]}
                    active={activeGeolocation}
                    onSelect={(g: Geolocation) => {
                      setActiveGeolocation(g);
                      setSearch("");
                    }}
                  />
                </div>

                {activeGeolocation && (
                  <main className="w-3/4 flex justify-between gap-2">
                    <div className="w-1/2 ">
                      <OptionsList
                        category={activeGeolocation}
                        options={Array.from(filteredGeolocationOptions)}
                        search={search}
                        setSearch={setSearch}
                        currentIncluded={currentIncluded}
                        currentExcluded={currentExcluded}
                        onAdd={handleAdd}
                        onShowList={handleShowList}
                      />
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
                  disabled={isSubmitting}
                />

                <SingleSelect
                  id="connectionType"
                  label="Connection Type"
                  showSearch={false}
                  required
                  options={connectionTypeOptions}
                  placeholder="Select connection type"
                  value={watch("connectionType")}
                  onChange={(val) => setValue("connectionType", val)}
                  error={errors.connectionType}
                  isDisabled={isSubmitting}
                />
              </FlexRow>

              <div className="flex gap-2 mt-5">
                <div className="w-1/2">
                  <SingleSelect
                    id="matchType"
                    label="Match Type"
                    required
                    showSearch={false}
                    options={matchTypeOptions}
                    placeholder="Select match type"
                    value={watch("matchType")}
                    onChange={(val) =>
                      setValue("matchType", val as "exact" | "range")
                    }
                    error={errors.matchType}
                    isDisabled={isSubmitting}
                  />
                </div>

                {matchType === "exact" && (
                  <div className="flex gap-2 items-end">
                    <div>
                      <TextInput
                        name="ipCode"
                        label="IP"
                        value={ipCode}
                        onChange={setIpCode}
                        errors={{}}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1 className="text-xs font-semibold">Action</h1>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-0.5 bg-blue-100 rounded-lg border border-blue-950 text-blue-950"
                          type="button"
                          onClick={() => handleIpAction("exclude")}
                          disabled={isSubmitting}
                          aria-label="Add to exclude"
                        >
                          -
                        </button>
                        <button
                          className="px-4 py-0.5 bg-blue-950 rounded-lg border border-blue-950 text-white"
                          type="button"
                          onClick={() => handleIpAction("include")}
                          disabled={isSubmitting}
                          aria-label="Add to include"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {matchType === "range" && (
                  <div className="flex gap-2 items-end">
                    <div className="flex gap-2">
                      <TextInput
                        name="ipCodeFrom"
                        label="IP From"
                        value={ipCodeFrom}
                        onChange={setIpCodeFrom}
                        errors={{}}
                        disabled={isSubmitting}
                      />
                      <TextInput
                        name="ipCodeTo"
                        label="IP To"
                        value={ipCodeTo}
                        onChange={setIpCodeTo}
                        errors={{}}
                        disabled={isSubmitting}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <h1 className="text-xs font-semibold">Action</h1>
                      <div className="flex gap-2">
                        <button
                          className="px-4 py-0.5 bg-blue-100 rounded-lg border border-blue-950 text-blue-950"
                          type="button"
                          onClick={() => handleIpAction("exclude")}
                          disabled={isSubmitting}
                          aria-label="Add to exclude"
                        >
                          -
                        </button>
                        <button
                          className="px-4 py-0.5 bg-blue-950 rounded-lg border border-blue-950 text-white"
                          type="button"
                          onClick={() => handleIpAction("include")}
                          disabled={isSubmitting}
                          aria-label="Add to include"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5">
                <ToggleSwitch
                  label="Block Proxy"
                  checked={watch("enableBlockProxy")}
                  onChange={(value) => {
                    setValue("enableBlockProxy", value);
                    const proxyEntry = "Block Proxy: Proxy Traffic";
                    const excludedIPList: string[] =
                      watch("excluded.IP" as const) || [];
                    if (value) {
                      if (!excludedIPList.includes(proxyEntry)) {
                        setValue("excluded.IP" as FormFieldPath, [
                          ...excludedIPList,
                          proxyEntry,
                        ]);
                      }
                    } else {
                      setValue(
                        "excluded.IP" as FormFieldPath,
                        excludedIPList.filter((i) => i !== proxyEntry)
                      );
                    }
                  }}
                  disabled={isSubmitting}
                  aria-label="Block Proxy"
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
                        <td className="p-2">{event.action || "-"}</td>
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
                    {events.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-2 text-center">
                          No events added
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div className="">
                  <PrimaryBtn
                    variant="primary"
                    className="px-4 py-0.5"
                    onClick={() => {
                      setIsEventModalOpen(true);
                      setEditingIndex(null);
                    }}
                    disabled={isSubmitting}
                  >
                    + Add New
                  </PrimaryBtn>
                </div>
              </div>

              <div className="mt-6">
                <FormActions
                  isSubmitting={isSubmitting}
                  isLoading={isLoading}
                  onCancel={() => {
                    reset();
                    setEvents([]);
                  }}
                />
              </div>
            </>
          );
        }}
      </FormArea>

      <TrafficFilteringModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmitSuccess={handleAddOrEditEvent}
        defaultData={editingIndex !== null ? events[editingIndex] : undefined}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default React.memo(TargetingForm);
