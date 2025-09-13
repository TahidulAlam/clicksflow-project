"use client";

import React, { memo, useCallback } from "react";
import { useFieldArray, UseFormReturn, Path } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import SingleSelect from "@/components/shared/dataTable/SingleSelect";
import { FormData } from "@/components/adminDashboard/offers/add/trackingAndControlForm/TrackingControlForm";
import ArrowLine from "../ArrowLine";

interface DynamicSelectInputListProps {
  form: UseFormReturn<FormData>;
  fieldName: "additionalEvents";
  placeholder?: string;
  isDisabled?: boolean;
}

const baseRevenueOptions = [
  { value: "health", label: "Health" },
  { value: "bizzOpp", label: "Bizz Opp" },
  { value: "dietAndWeightLoss", label: "Diet And Weight Loss" },
];

interface EventRowProps {
  form: UseFormReturn<FormData>;
  fieldName: "additionalEvents";
  field: { id: string };
  index: number;
  placeholder: string;
  isDisabled: boolean;
  fieldErrors?:
    | Record<
        number,
        { baseRevenueType?: { message?: string }; value?: { message?: string } }
      >
    | undefined;
  onRemove: (index: number) => void;
}

const EventRow = memo<EventRowProps>(
  ({
    form,
    fieldName,
    index,
    placeholder,
    isDisabled,
    fieldErrors,
    onRemove,
  }) => {
    const { watch, setValue } = form;

    const baseRevenueType =
      (watch(
        `${fieldName}.${index}.baseRevenueType` as Path<FormData>
      ) as string) || "";
    const value =
      (watch(`${fieldName}.${index}.value` as Path<FormData>) as string) || "";

    const handleBaseRevenueChange = useCallback(
      (val: string) => {
        setValue(
          `${fieldName}.${index}.baseRevenueType` as Path<FormData>,
          val
        );
      },
      [setValue, fieldName, index]
    );

    const handleValueChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(
          `${fieldName}.${index}.value` as Path<FormData>,
          e.target.value
        );
      },
      [setValue, fieldName, index]
    );

    const handleRemoveClick = useCallback(() => {
      onRemove(index);
    }, [onRemove, index]);

    return (
      <div className="flex " role="group" aria-label={`Event ${index + 1}`}>
        {/* Select field */}
        <div className="w-1/2 ">
          <SingleSelect
            id={`${fieldName}.${index}.baseRevenueType`}
            className="rounded-l-md border-l-none mt-0 z-10 "
            required
            placeholder={baseRevenueOptions[0]?.label}
            options={baseRevenueOptions}
            value={baseRevenueType || baseRevenueOptions[0]?.value}
            onChange={handleBaseRevenueChange}
            error={
              fieldErrors?.[index]?.baseRevenueType
                ? {
                    type: "manual",
                    message: fieldErrors[index]?.baseRevenueType?.message ?? "",
                  }
                : undefined
            }
            isDisabled={isDisabled}
            aria-required="true"
          />
        </div>

        {/* Input + Remove */}
        <div className="w-1/2 flex ">
          <input
            type="text"
            id={`${fieldName}.${index}.value`}
            className="block w-full border-l h-[30px] px-1.5 my-2 border-y border-gray-300   focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm disabled:bg-gray-100"
            placeholder={placeholder}
            value={value}
            onChange={handleValueChange}
            disabled={isDisabled}
            aria-label={`Event ${index + 1} name`}
            aria-invalid={!!fieldErrors?.[index]?.value}
          />
          {fieldErrors?.[index]?.value && (
            <p className="mt-1 text-sm text-red-600">
              {fieldErrors[index].value.message}
            </p>
          )}
          <button
            type="button"
            onClick={handleRemoveClick}
            className="h-[30px] px-1.5 my-2 border border-red-500 bg-red-500 rounded-r-md text-white hover:bg-red-600 disabled:bg-red-300 transition-colors"
            disabled={isDisabled}
            aria-label={`Remove event ${index + 1}`}
          >
            <MdClose size={16} />
          </button>
        </div>
      </div>
    );
  }
);

EventRow.displayName = "EventRow";

const DynamicSelectInputList: React.FC<DynamicSelectInputListProps> = ({
  form,
  fieldName,
  placeholder = "Enter event name",
  isDisabled = false,
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
  } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const fieldErrors = errors[fieldName] as
    | Record<
        number,
        { baseRevenueType?: { message?: string }; value?: { message?: string } }
      >
    | undefined;

  const handleAdd = useCallback(() => {
    append({ baseRevenueType: "", value: "" });
  }, [append]);

  return (
    <div className="flex justify-between my-4  scrollbar-thin ">
      {/* Add Button */}
      <div className="w-1/6 flex items-center ">
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center h-[30px] w-full px-1.5 bg-gray-50 z-10 border border-gray-300 rounded-lg p-1 gap-2 text-gray-800  disabled:text-gray-400 transition-colors text-xs text-center justify-center"
          disabled={isDisabled || isSubmitting}
          aria-label="Add a new event"
        >
          <FaPlus size={12} />
          <span className="text-xs font-medium whitespace-nowrap">Add New</span>
        </button>
      </div>

      {/* Divider */}
      {fields.length > 0 && (
        <div className="w-1/6 flex items-center justify-center">
          {/* <div className="w-px relative h-84 -rotate-90 bg-gray-300 py-4 ml-30" /> */}
          <ArrowLine direction="right" length={210} className="ml-0 w-full" />
        </div>
      )}

      {/* Events */}
      <div
        className={`space-y-2 w-4/6 z-10 p-4 pb-8 max-h-[336px] scrollbar-thin rounded-lg ${
          fields.length > 0 ? "border border-gray-300  overflow-y-scroll" : ""
        }`}
      >
        {fields.map((field, index) => (
          <EventRow
            key={field.id}
            form={form}
            fieldName={fieldName}
            field={field}
            index={index}
            placeholder={placeholder}
            isDisabled={isDisabled || isSubmitting}
            fieldErrors={fieldErrors}
            onRemove={remove}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicSelectInputList;
