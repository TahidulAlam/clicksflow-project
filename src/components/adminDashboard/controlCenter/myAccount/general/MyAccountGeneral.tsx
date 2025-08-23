"use client";

import React from "react";
import toast from "react-hot-toast";
import { FaPen } from "react-icons/fa";
import UserProfileCard, { UserProfileData } from "./UserProfileCard";
import BoxAccordion, {
  BoxContent,
  BoxHeader,
} from "@/components/shared/boxAccordion/BoxAccordion";

const userData: UserProfileData = {
  id: 1,
  username: "admin",
  name: "Admin",
  title: "Mr",
  role: "Superadmin",
  partnerManager: true,
  advertiserManager: true,
  businessUnit: "President",
  accountStatus: "Active",
  modified: "2025-05-18 12:34 AM",
  created: "2022-03-27 08:17 AM",
  photoUrl: "https://via.placeholder.com/120x120.png?text=Photo",
};

const MyAccountGeneral = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <div>
            <BoxAccordion>
              <BoxHeader className="bg-blue-100 flex justify-between">
                <h2 className="text-sm font-semibold py-1">Account Info</h2>
              </BoxHeader>
              <BoxContent>
                <div className="p-4">
                  <UserProfileCard data={userData} />
                </div>
              </BoxContent>
            </BoxAccordion>
          </div>
          <div>
            <BoxAccordion>
              <BoxHeader className="bg-blue-100 flex justify-between">
                <h2 className="text-sm font-semibold py-1">Security</h2>
              </BoxHeader>
              <BoxContent>
                <div className="p-4">
                  <UserProfileCard data={userData} />
                </div>
              </BoxContent>
            </BoxAccordion>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div>
            <BoxAccordion>
              <BoxHeader className="bg-blue-100 flex justify-between">
                <h2 className="text-sm font-semibold py-1">Contact</h2>
                <button
                  type="button"
                  onClick={() => toast.success("Edit button clicked")}
                  className="flex gap-2 items-center justify-center text-gray-800 hover:text-gray-950"
                >
                  <span className="text-sm">
                    <FaPen />
                  </span>
                  <span className="text-sm">Edit</span>
                </button>
              </BoxHeader>
              <BoxContent>
                <div className="p-4">
                  <span>id=accordion-2</span>
                </div>
              </BoxContent>
            </BoxAccordion>
          </div>
          <div>
            <BoxAccordion>
              <BoxHeader className="bg-blue-100 flex justify-between">
                <h2 className="text-sm font-semibold py-1">Links</h2>
              </BoxHeader>
              <BoxContent>
                <div className="p-4">
                  <UserProfileCard data={userData} />
                </div>
              </BoxContent>
            </BoxAccordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountGeneral;
