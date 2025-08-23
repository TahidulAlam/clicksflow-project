"use client";

import React, { useState } from "react";
import { z } from "zod";
import Container from "@/components/shared/container/Container";
import FormArea from "@/components/shared/forms/FormArea";
import TextInput from "@/components/shared/forms/TextInput";
import FormActions from "@/components/shared/forms/FormActions";
import { Controller } from "react-hook-form";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import toast from "react-hot-toast";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import TrackingLinkParametersModal, {
  TrackingLinkParametersData,
  formSchema as eventFormSchema,
} from "./TrackingLinkParametersModal";
// import Dropdown from "../../../../shared/dropdown/Dropdown";
import MultiLevelDropdown from "@/components/shared/dropdown/MultiLevelDropdown";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  postbackURL: z.string().optional(),
});

type FormType = z.infer<typeof schema>;

interface TrafficSourceAddProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const TrafficSourceAdd: React.FC<TrafficSourceAddProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<TrackingLinkParametersData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddOrEditEvent = (event: TrackingLinkParametersData) => {
    try {
      const validatedEvent = eventFormSchema.parse(event);
      if (editingIndex !== null) {
        setEvents((prev) =>
          prev.map((e, idx) => (idx === editingIndex ? validatedEvent : e))
        );
        toast.success("Event updated successfully!");
      } else {
        setEvents((prev) => [...prev, validatedEvent]);
        toast.success("Event added successfully!");
      }
    } catch (error) {
      console.error("Event validation failed:", error);
      toast.error("Invalid event data.");
    } finally {
      setIsEventModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEditEvent = (index: number) => {
    if (index >= 0 && index < events.length) {
      setEditingIndex(index);
      setIsEventModalOpen(true);
    }
  };

  const handleDeleteEvent = (index: number) => {
    if (index >= 0 && index < events.length) {
      setEvents((prev) => prev.filter((_, i) => i !== index));
      toast.success("Event deleted.");
    }
  };
  const handleSubmit = async (data: FormType) => {
    console.log("Submitted Data:", data);
    onSubmitSuccess?.();
  };

  return (
    <Container>
      <FormArea
        schema={schema}
        defaultValues={{
          name: "",
          postbackURL: "",
        }}
        onSubmit={handleSubmit}
      >
        {(methods) => {
          const {
            register,
            reset,
            control,
            formState: { errors, isSubmitting },
          } = methods;

          return (
            <>
              <TextInput
                name="name"
                label="Name"
                register={register}
                errors={errors}
                required
                disabled={isSubmitting}
              />
              <Controller
                control={control}
                name="postbackURL"
                render={({ field: urlField }) => (
                  <MacroBuilder
                    labelSideSpan="(HTML pixels aren't supported)"
                    label="Postback URL"
                    url={urlField.value || ""}
                    setUrl={urlField.onChange}
                    error={errors.postbackURL}
                    disabled={isSubmitting || isLoading}
                    showDropdownButton={false}
                    forceDropdownOpen={true}
                  />
                )}
              />
              <div className="flex justify-between">
                <h1 className="text-xs font-bold">
                  Tracking Link Parameters{" "}
                  <span className="text-red-500">(*)</span>
                </h1>
                <PrimaryBtn
                  variant="primary"
                  className="p-2"
                  onClick={() => setIsEventModalOpen(true)}
                  disabled={isSubmitting}
                >
                  + Add
                </PrimaryBtn>
              </div>
              <div className="border border-gray-300 rounded-md">
                <table className="table-auto min-w-full rounded-md text-sm border-separate border-spacing-0">
                  <thead className="bg-gray-200 rounded-t-md">
                    <tr>
                      <th className="text-start text-gray-700 py-2 px-4 text-xs">
                        Parameter
                      </th>
                      <th className="text-center text-gray-700 py-2 px-4 text-xs">
                        Value
                      </th>
                      <th className=" text-gray-700 py-2 px-4 text-xs text-end">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {events.map((event, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2 text-xs">{event.formLabel}</td>
                        <td className="px-4 py-2 text-xs text-center">
                          {event.value}
                        </td>
                        <td className="px-4 py-2 text-xs flex justify-end">
                          <MultiLevelDropdown
                            label=":"
                            position="bottom-right"
                            submenuPosition="left"
                            menuItems={[
                              {
                                label: "Edit",
                                onClick: () => handleEditEvent(idx),
                              },
                              {
                                label: "Delete",
                                onClick: () => handleDeleteEvent(idx),
                              },
                            ]}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => reset()}
              />
            </>
          );
        }}
      </FormArea>
      <TrackingLinkParametersModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setEditingIndex(null);
        }}
        title="Generate Form"
        onSubmit={handleAddOrEditEvent}
        defaultValues={editingIndex !== null ? events[editingIndex] : undefined}
        isSubmittingForm={isLoading}
      />
    </Container>
  );
};

export default TrafficSourceAdd;
