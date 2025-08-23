/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import React, { useMemo, useState, useEffect } from "react";
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

const schema = z.object({
  messages: z
    .array(
      z.object({
        subject: z
          .string()
          .min(2, "Subject must be at least 2 characters")
          .max(50),
        content: z.string().min(1, "Content is required"),
      })
    )
    .min(1, "At least one message is required"),
});

type FormType = z.infer<typeof schema>;

interface AdminMessageState {
  messages: string[];
}

interface MessageOfferProps {
  onSubmitSuccess?: () => void;
  isLoading?: boolean;
}

const parseMessage = (message: string) => {
  const colonIndex = message.indexOf(":");
  return {
    subject: colonIndex > 0 ? message.substring(0, colonIndex).trim() : "",
    content:
      colonIndex > 0
        ? message.substring(colonIndex + 1).trim()
        : message.trim(),
  };
};

const MessageOffer: React.FC<MessageOfferProps> = ({
  onSubmitSuccess,
  isLoading = false,
}) => {
  const dispatch = useAppDispatch();
  const storeMessages = useAppSelector(
    (state: { messageAdminDashboard: AdminMessageState }) =>
      state.messageAdminDashboard.messages || []
  );

  const [allMessages, setAllMessages] = useState<string[]>(storeMessages);

  const parsedMessages = useMemo(() => {
    if (allMessages.length === 0) {
      return [{ subject: "", content: "" }];
    }
    return allMessages.map((msg) => parseMessage(msg));
  }, [allMessages]);

  useEffect(() => {
    setAllMessages(storeMessages);
  }, [storeMessages]);

  const handleSubmit = async (data: FormType) => {
    try {
      const storeFormat = data.messages.map(
        (msg) => `${msg.subject}: ${msg.content}`
      );

      storeMessages.forEach((msg) => {
        if (!storeFormat.includes(msg)) {
          dispatch(removeMessage(msg));
        }
      });

      storeFormat.forEach((msg) => {
        if (!storeMessages.includes(msg)) {
          dispatch(setMessage(msg));
        }
      });

      toast.success("Messages updated successfully!");
      onSubmitSuccess?.();
    } catch (error) {
      toast.error("Failed to update messages");
    }
  };

  const updateMessage = (index: number, subject: string, content: string) => {
    const newMessage = `${subject}: ${content}`;
    const updatedMessages = [...allMessages];

    if (index < updatedMessages.length) {
      if (updatedMessages[index]) {
        dispatch(removeMessage(updatedMessages[index]));
      }

      updatedMessages[index] = newMessage;
      setAllMessages(updatedMessages);

      dispatch(setMessage(newMessage));
    }
  };

  return (
    <FormArea
      className="space-y-5"
      formHeaderShow={false}
      schema={schema}
      defaultValues={{
        messages: parsedMessages,
      }}
      onSubmit={handleSubmit}
    >
      {(methods) => {
        const {
          register,
          control,
          getValues,
          formState: { errors, isSubmitting },
        } = methods;

        return (
          <div className="space-y-8">
            {parsedMessages.map((_, index) => (
              <div
                key={index}
                className="message-group border-b border-gray-200 pb-6 last:border-0"
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
                    const content = getValues(
                      `messages.${index}.content` as const
                    );
                    updateMessage(index, value, content);
                  }}
                />

                <Controller
                  control={control}
                  name={`messages.${index}.content` as const}
                  render={({ field }) => (
                    <MacroBuilder
                      label="Content"
                      className="max-w-lg mx-auto"
                      url={field.value || ""}
                      required
                      setUrl={(value: string) => {
                        field.onChange(value);
                        const subject = getValues(
                          `messages.${index}.subject` as const
                        );
                        updateMessage(index, subject, value);
                      }}
                      error={errors?.messages?.[index]?.content}
                      disabled={isSubmitting || isLoading}
                      showDropdownButton={false}
                      forceDropdownOpen={true}
                    />
                  )}
                />
              </div>
            ))}

            <div className="flex justify-end">
              <FormActions
                isSubmitting={isSubmitting}
                isLoading={isLoading}
                onCancel={() => {
                  methods.reset({
                    messages: allMessages.map((msg) => parseMessage(msg)),
                  });
                }}
              />
            </div>
          </div>
        );
      }}
    </FormArea>
  );
};

export default MessageOffer;
