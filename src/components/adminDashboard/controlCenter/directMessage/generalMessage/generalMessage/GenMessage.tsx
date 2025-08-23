/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Controller } from "react-hook-form";
import { z } from "zod";
import FormActions from "@/components/shared/forms/FormActions";
import FormArea from "@/components/shared/forms/FormArea";
import MacroBuilder from "@/components/shared/forms/MacroBuilder";
import TextInput from "@/components/shared/forms/TextInput";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";

import {
  setMessage,
  removeMessage,
} from "@/features/admin/message/messageSlice";
import { RootState } from "@/lib/store/store";

const schema = z.object({
  messages: z
    .array(
      z.object({
        subject: z.string().min(2, "Subject must be at least 2 characters"),
        content: z.string().min(1, "Content is required"),
      })
    )
    .min(1, "At least one message is required"),
});

type FormType = z.infer<typeof schema>;

interface GenMessageProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const parseMessage = (msg: string) => {
  const idx = msg.indexOf(":");
  return {
    subject: idx > 0 ? msg.slice(0, idx).trim() : "",
    content: idx > 0 ? msg.slice(idx + 1).trim() : msg.trim(),
  };
};

const GenMessage: React.FC<GenMessageProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const storeMessages = useAppSelector(
    (state: RootState) => state.messageAdminDashboard.messages
  );

  const parsedMessages = storeMessages.length
    ? storeMessages.map(parseMessage)
    : [{ subject: "", content: "" }];

  const handleSubmit = async (data: FormType) => {
    try {
      const newMessages = data.messages.map(
        (msg) => `${msg.subject}: ${msg.content}`
      );

      // Remove old messages
      storeMessages.forEach((msg: string) => {
        if (!newMessages.includes(msg)) {
          dispatch(removeMessage(msg));
        }
      });

      // Add new messages
      newMessages.forEach((msg) => {
        if (!storeMessages.includes(msg)) {
          dispatch(setMessage(msg));
        }
      });

      toast.success("Messages updated successfully");
      onSubmitSuccess?.();
    } catch {
      toast.error("Failed to update messages");
    }
  };

  return (
    <FormArea
      className="space-y-5"
      formHeaderShow={false}
      schema={schema}
      defaultValues={{ messages: parsedMessages }}
      onSubmit={handleSubmit}
    >
      {(methods) => {
        const {
          register,
          control,
          getValues,
          formState: { errors, isSubmitting },
          reset,
        } = methods;

        const updateMessage = (
          index: number,
          subject: string,
          content: string
        ) => {
          const msg = `${subject}: ${content}`;
          if (!storeMessages.includes(msg)) {
            dispatch(removeMessage(storeMessages[index]));
            dispatch(setMessage(msg));
          }
        };

        return (
          <div className="space-y-8">
            {parsedMessages.map((_: any, index: number) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <TextInput
                  name={`messages.${index}.subject`}
                  label="Subject"
                  className="max-w-lg mx-auto"
                  register={register}
                  errors={errors?.messages?.[index]?.subject}
                  required
                  disabled={isSubmitting || isLoading}
                  onChange={(value) => {
                    const content = getValues(`messages.${index}.content`);
                    updateMessage(index, value, content);
                  }}
                />

                <Controller
                  control={control}
                  name={`messages.${index}.content`}
                  render={({ field }) => (
                    <MacroBuilder
                      label="Content"
                      className="max-w-lg mx-auto"
                      url={field.value}
                      required
                      setUrl={(value) => {
                        field.onChange(value);
                        const subject = getValues(`messages.${index}.subject`);
                        updateMessage(index, subject, value);
                      }}
                      error={errors?.messages?.[index]?.content}
                      disabled={isSubmitting || isLoading}
                      showDropdownButton={false}
                      forceDropdownOpen
                    />
                  )}
                />
              </div>
            ))}

            <div className="flex justify-end">
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() =>
                  reset({ messages: storeMessages.map(parseMessage) })
                }
              />
            </div>
          </div>
        );
      }}
    </FormArea>
  );
};

export default GenMessage;
