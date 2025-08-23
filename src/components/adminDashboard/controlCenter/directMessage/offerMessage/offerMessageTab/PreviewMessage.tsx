"use client";

import React from "react";
import { useAppSelector } from "@/hooks/useAppDispatch";
import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";

const PreviewMessage = () => {
  const messages = useAppSelector(
    (state) => state.messageAdminDashboard.messages
  );

  return (
    <div>
      <div className=" max-w-xl mx-auto">
        <h2 className="text-sm mb-2">Preview </h2>
        {/* <PrimaryBtn variant="custom">Clear</PrimaryBtn> */}
        <div className="p-4 border border-gray-300 rounded bg-gray-50">
          {messages.length === 0 ? (
            <p className="text-gray-500">No messages to preview.</p>
          ) : (
            <ul className="">
              {messages.map((msg, index) => (
                <li key={index} className="bg-white text-gray-800 text-xs">
                  {msg}
                </li>
              ))}
            </ul>
          )}
        </div>
        <PrimaryBtn
          variant="custom"
          className="mt-4 bg-gray-200 border border-gray-700 rounded-lg px-4 py-4 text-gray-800 text-xs"
          onClick={() => {
            console.log("Messages sent:", messages);
          }}
        >
          Send Test Mail
        </PrimaryBtn>
      </div>
    </div>
  );
};
export default PreviewMessage;
