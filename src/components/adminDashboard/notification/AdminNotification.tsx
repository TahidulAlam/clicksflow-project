import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import React from "react";

const AdminNotification = () => {
  return (
    <div>
      <PrimaryBtn>Mark as all Read</PrimaryBtn>
      <div className="w-full bg-white border border-gray-300 rounded p-10 text-center flex items-center justify-center my-5">
        <span className="text-xs">Data not found </span>
      </div>
    </div>
  );
};

export default AdminNotification;
