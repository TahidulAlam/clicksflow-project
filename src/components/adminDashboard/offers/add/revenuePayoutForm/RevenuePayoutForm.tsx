"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaDollarSign } from "react-icons/fa";
import toast from "react-hot-toast";

import TextInput from "@/components/shared/forms/TextInput";
import NumberInput from "@/components/shared/forms/NumberInput";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import ToggleSwitch from "@/components/shared/buttons/ToggleSwitch";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import FormActions from "@/components/shared/forms/FormActions";
import {
  RevenueAddModal,
  RevenueEventData,
  formSchema as eventFormSchema,
} from "@/components/adminDashboard/offers/add/revenuePayoutForm/RevenueAddModal";
import Container from "@/components/shared/container/Container";

export const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  baseRevenueType: z.string().min(1, "Base Revenue Type is required"),
  basePayoutType: z.string().min(1, "Base Payout Type is required"),
  revenuePerConversion: z
    .number({ invalid_type_error: "Revenue must be a number" })
    .min(1, "Revenue must be greater than 0"),
  manualApproval: z.boolean(),
  allowDuplicates: z.boolean(),
  firePostback: z.boolean(),
  events: z.array(eventFormSchema).optional(),
});

export type FormData = z.infer<typeof formSchema>;

const baseRevenueOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const basePayoutOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

const RevenuePayoutForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      baseRevenueType: "",
      basePayoutType: "",
      revenuePerConversion: 0,
      manualApproval: false,
      allowDuplicates: false,
      firePostback: true,
      events: [],
    },
  });

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [events, setEvents] = useState<RevenueEventData[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    setValue("events", events);
  }, [events, setValue]);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      console.log("Form Data with Events:", formData);
      reset();
      setEvents([]);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Submission failed:", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const handleAddOrEditEvent = (event: RevenueEventData) => {
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

  const handleEditEvent = (index: number) => {
    if (index >= 0 && index < events.length) {
      setEditingIndex(index);
      setIsEventModalOpen(true);
    }
  };

  const handleDeleteEvent = (index: number) => {
    if (index >= 0 && index < events.length) {
      setEvents((prev) => prev.filter((_, idx) => idx !== index));
      toast.success("Event deleted successfully!");
    }
  };

  return (
    <Container>
      <span className="text-xs text-gray-600">
        {" "}
        <span className="bg-blue-950 py-0.5 text-[10px] px-[6px] rounded-full text-white">
          {" "}
          i{" "}
        </span>{" "}
        Fields with an asterisk (<span className="text-red-600">*</span>) are
        mandatory{" "}
      </span>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...register("events")} />

        <TextInput
          name="name"
          label="Name"
          register={register}
          errors={errors}
          required
          disabled={isSubmitting}
        />

        <div className="grid grid-cols-2 gap-4">
          <SingleSelect
            id="baseRevenueType"
            label="Base Revenue Type"
            required
            options={baseRevenueOptions}
            value={watch("baseRevenueType")}
            onChange={(val) => setValue("baseRevenueType", val)}
            error={errors.baseRevenueType}
            isDisabled={isSubmitting}
          />
          <SingleSelect
            id="basePayoutType"
            label="Base Payout Type"
            required
            options={basePayoutOptions}
            value={watch("basePayoutType")}
            onChange={(val) => setValue("basePayoutType", val)}
            error={errors.basePayoutType}
            isDisabled={isSubmitting}
          />
        </div>

        <NumberInput<FormData>
          name="revenuePerConversion"
          label="Revenue per Conversion"
          type="number"
          placeholder="Enter amount"
          icon={FaDollarSign}
          register={register}
          errors={errors}
          required
          valueAsNumber
          disabled={isSubmitting}
        />

        {/* Toggles */}
        <div className="flex flex-wrap gap-6 rounded-md">
          <ToggleSwitch
            label="Manually Approve Conv."
            checked={watch("manualApproval")}
            onChange={(val) => setValue("manualApproval", val)}
            disabled={isSubmitting}
          />
          <ToggleSwitch
            label="Allow Duplicate Conversions"
            checked={watch("allowDuplicates")}
            onChange={(val) => setValue("allowDuplicates", val)}
            disabled={isSubmitting}
          />
          <ToggleSwitch
            label="Fire Postback"
            checked={watch("firePostback")}
            onChange={(val) => setValue("firePostback", val)}
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Additional Events</h2>
          <PrimaryBtn
            variant="primary"
            className="text-xs !px-2"
            onClick={() => {
              setIsEventModalOpen(true);
              setEditingIndex(null);
            }}
            disabled={isSubmitting}
          >
            + Add New
          </PrimaryBtn>
        </div>

        <div className="border border-gray-300 rounded-md max-h-[500px] overflow-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <table className="w-full border-separate border-spacing-0 text-left text-xs whitespace-nowrap table-auto    overflow-x-scroll">
            <thead className="bg-gray-100 text-gray-600 border border-gray-400">
              <tr>
                <th className="p-2">Name</th>
                <th className="p-2">Revenue Type</th>
                <th className="p-2">Revenue/Event</th>
                <th className="p-2">Payout Type</th>
                <th className="p-2">Cost/Event</th>
                <th className="p-2">Manual Approval</th>
                <th className="p-2">Allow Duplicates</th>
                <th className="p-2">Fire Partner Postback</th>
                <th className="p-2">Fire Postback</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{event.name}</td>
                  <td className="p-2">{event.revenueType}</td>
                  <td className="p-2">${event.revenuePerEvent}</td>
                  <td className="p-2">
                    {event.isPrivate ? "N/A" : event.payoutType || "N/A"}
                  </td>
                  <td className="p-2">
                    {event.isPrivate
                      ? "N/A"
                      : `$${event.costPerConversionEvent || 0}`}
                  </td>
                  <td className="p-2">{event.manualApproval ? "Yes" : "No"}</td>
                  <td className="p-2">
                    {event.allowDuplicates ? "Yes" : "No"}
                  </td>
                  <td className="p-2">
                    {event.isPrivate
                      ? "N/A"
                      : event.firePartnerPostback
                      ? "Yes"
                      : "No"}
                  </td>
                  <td className="p-2">{event.firePostback ? "Yes" : "No"}</td>
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
        </div>

        <FormActions
          isSubmitting={isSubmitting}
          isLoading={isSubmitting}
          onCancel={() => {
            reset();
            setEvents([]);
          }}
        />
      </form>

      {/* Modal */}
      <RevenueAddModal
        isOpen={isEventModalOpen}
        onClose={() => {
          setIsEventModalOpen(false);
          setEditingIndex(null);
        }}
        onSubmitSuccess={handleAddOrEditEvent}
        defaultData={editingIndex !== null ? events[editingIndex] : undefined}
        isLoading={isSubmitting}
      />
    </Container>
  );
};

export default RevenuePayoutForm;
