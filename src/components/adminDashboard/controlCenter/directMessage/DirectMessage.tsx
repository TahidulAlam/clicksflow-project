import PrimaryBtn from "@/components/shared/buttons/PrimaryBtn";
import Link from "next/link";
import React from "react";

const DirectMessage = () => {
  return (
    <div>
      <div className="max-w-2xl mx-auto bg-white p-5 border border-gray-300 rounded-md">
        <div className="flex justify-between">
          <div>
            <h1 className="text-gray-500">General</h1>
            <h1 className="text-gray-500">
              Contact Network, Partner or Advertiser Users
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/admin/control/message/general">
              <PrimaryBtn
                size="lg"
                variant="custom"
                className="bg-blue-950 text-white"
              >
                Select
              </PrimaryBtn>
            </Link>
          </div>
        </div>
        <div className="border-t-2 my-4 border-gray-300"></div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-gray-500">Offer Details</h1>
            <h1 className="text-gray-500">
              Share Offer information with Partners
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <Link href="/admin/control/message/offer">
              <PrimaryBtn
                size="lg"
                variant="custom"
                className="bg-blue-950 text-white"
              >
                select
              </PrimaryBtn>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectMessage;
