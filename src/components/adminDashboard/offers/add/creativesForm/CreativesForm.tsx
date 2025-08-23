import React, { useCallback, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import CreativesModal from "./CreativesModal";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";

// Zod Schemas
const eventSchema = z.object({
  creativeName: z.string().min(1, "Name is required"),
  type: z.string().min(1, "Match Type is required"),
  status: z.string().min(1, "Match Type is required"),
  archiveImage: z.string().min(1, "Match Type is required"),
  email: z.string().min(1, "Match Type is required"),
  emailFrom: z.string().min(1, "Match Type is required"),
  codeEmail: z.string().min(1, "Match Type is required"),
  attachment: z.string().min(1, "Match Type is required"),
  htmlForm: z.string().min(1, "Match Type is required"),
  visibility: z.boolean(),
});
type EventData = z.infer<typeof eventSchema>;

const formSchema = z.object({
  events: z.array(eventSchema),
});
type FormData = z.infer<typeof formSchema>;

const CreativesForm: React.FC = () => {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      events: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleAddOrEditEvent = (data: EventData) => {
    try {
      const validated = eventSchema.parse(data);

      if (editingIndex !== null) {
        setEvents((prev) =>
          prev.map((item, idx) => (idx === editingIndex ? validated : item))
        );
        toast.success("Event updated successfully");
      } else {
        setEvents((prev) => [...prev, validated]);
        toast.success("Event added successfully");
      }
    } catch (err) {
      console.error("Validation error:", err);
      toast.error("Invalid event data");
    } finally {
      setIsEventModalOpen(false);
      setEditingIndex(null);
    }
  };

  const handleEditEvent = useCallback(
    (index: number) => {
      if (index >= 0 && index < events.length) {
        setEditingIndex(index);
        setIsEventModalOpen(true);
      } else {
        toast.error("Invalid index for editing");
      }
    },
    [events]
  );

  const handleDeleteEvent = useCallback(
    (index: number) => {
      if (index >= 0 && index < events.length) {
        setEvents((prev) => prev.filter((_, idx) => idx !== index));
        toast.success("Event deleted");
      } else {
        toast.error("Invalid index for deletion");
      }
    },
    [events]
  );

  const onSubmit = (data: FormData) => {
    const finalData = { ...data, events };
    console.log("Submitted Data:", finalData);

    try {
      formSchema.parse(finalData); // validate all events
      toast.success("Form submitted successfully!");
    } catch (err) {
      console.error("Form validation failed:", err);
      toast.error("Submission failed: invalid form data");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mt-5">
            <table className="table-auto min-w-full border-separate border-spacing-0 text-xs rounded-t-lg">
              <thead className="bg-gray-100 text-gray-600 ">
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
                  <tr
                    key={`${event?.creativeName}-${idx}`}
                    className="border-t"
                  >
                    <td className="p-2">{event?.creativeName}</td>
                    <td className="p-2">{event?.type}</td>
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

        <CreativesModal
          isOpen={isEventModalOpen}
          onClose={() => {
            setIsEventModalOpen(false);
            setEditingIndex(null);
          }}
          onSubmitSuccess={handleAddOrEditEvent}
          defaultData={editingIndex !== null ? events[editingIndex] : undefined}
          isLoading={isSubmitting}
        />
      </FormProvider>
    </div>
  );
};

export default CreativesForm;
