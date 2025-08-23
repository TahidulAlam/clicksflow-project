"use client"; // Only if using client-side fetched data

import React from "react";

export type UserProfileData = {
  id: number;
  username: string;
  name: string;
  title: string;
  role: string;
  partnerManager: boolean;
  advertiserManager: boolean;
  businessUnit: string;
  accountStatus: "Active" | "Inactive";
  modified: string;
  created: string;
  photoUrl: string;
};

type Props = {
  data: UserProfileData;
};

const UserProfileCard: React.FC<Props> = ({ data }) => {
  return (
    <div className=" p-6 w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow">
      {/* Left section */}
      <div className="space-y-2 text-sm text-gray-800">
        <p>
          <strong>ID</strong>
          <br />
          {data.id}
        </p>
        <p>
          <strong>Username</strong>
          <br />
          {data.username}
        </p>
        <p>
          <strong>Name</strong>
          <br />
          {data.name}
        </p>
        <p>
          <strong>Title</strong>
          <br />
          {data.title}
        </p>
        <p>
          <strong>Role</strong>
          <br />
          {data.role}
        </p>
        <p>
          <strong>Partner Manager</strong>
          <br />
          <span
            className={
              data.partnerManager
                ? "text-green-600 font-semibold"
                : "text-red-600"
            }
          >
            {data.partnerManager ? "YES" : "NO"}
          </span>
        </p>
        <p>
          <strong>Advertiser Manager</strong>
          <br />
          <span
            className={
              data.advertiserManager
                ? "text-green-600 font-semibold"
                : "text-red-600"
            }
          >
            {data.advertiserManager ? "YES" : "NO"}
          </span>
        </p>
        <p>
          <strong>Business Unit</strong>
          <br />
          {data.businessUnit}
        </p>
      </div>

      {/* Right section */}
      <div className="flex flex-col items-start text-sm text-gray-800">
        <div className="mb-4 text-start">
          <strong>Photo</strong>
          {/* <Image
            src={data.photoUrl}
            alt="User Photo"
            className="w-32 h-32 mt-2 rounded border border-gray-300 object-cover bg-blue-100"
          /> */}
        </div>

        <div className="text-start">
          <strong>Account Status</strong>
          <div className="mt-1 flex items-start justify-start gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                data.accountStatus === "Active" ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="font-medium">{data.accountStatus}</span>
          </div>
        </div>

        <hr className="w-full my-4 border-gray-300" />

        <div className="text-start">
          <strong>Modified</strong>
          <br />
          {data.modified}
        </div>
        <hr className="w-full my-4 border-gray-300" />

        <div className="text-start mt-2">
          <strong>Created</strong>
          <br />
          {data.created}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
