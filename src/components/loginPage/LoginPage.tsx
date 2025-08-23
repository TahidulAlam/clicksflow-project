"use client";
// import React, { useEffect, useState } from "react";
import { IoIosInformationCircle } from "react-icons/io";
import PrimaryBtn from "../shared/buttons/PrimaryBtn";
import { FaUserTie } from "react-icons/fa6";
import { HiSpeakerphone } from "react-icons/hi";
import Image from "next/image";

const LoginPage = () => {
  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e5edf7] relative overflow-hidden">
      {/* {isMounted ? (
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute w-[400px] h-[400px] bg-[#d2e1f4] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
        </div>
      ) : (
        <div className="fixed inset-0 bg-[#e5edf7]" />
      )} */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute w-[400px] h-[400px] bg-[#d2e1f4] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45" />
      </div>
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-md border border-gray-300">
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png"
            alt="Clicks Flow"
            width={200}
            height={100}
            className="h-8 w-auto"
            priority
          />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-800 mb-2">
          Sign in to partner account
        </h2>

        <p className="text-xs text-gray-500 mb-4 flex items-center">
          <IoIosInformationCircle className="mr-1 text-gray-700" />
          Fields with an asterisk (<span className="text-red-500">*</span>) are
          mandatory
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-[12px] font-medium text-gray-700"
            >
              Username / Email <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-[12px] font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Remember Me
            </label>
            <a href="#" className="text-[#23395d] hover:underline">
              Forgot password?
            </a>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#23395d] hover:bg-[#1b2e4b] text-white font-medium py-2 px-5 rounded-md transition-colors"
            >
              Sign In
            </button>
          </div>
        </form>

        <hr className="my-6" />

        <p className="text-center text-[12px] text-gray-600 mb-4">
          Don&apos;t have any account?{" "}
          <a href="#" className="text-[#23395d] hover:underline">
            Register
          </a>
        </p>

        <div className="flex justify-center gap-4 mb-4">
          <PrimaryBtn
            variant="primary"
            size="sm"
            icon={<FaUserTie />}
            fullWidth
          >
            Partner
          </PrimaryBtn>
          <PrimaryBtn
            variant="primary"
            size="sm"
            icon={<HiSpeakerphone />}
            fullWidth
          >
            Advertiser
          </PrimaryBtn>
        </div>

        <p className="text-center text-[12px] text-gray-500">
          Need Help?{" "}
          <a href="#" className="text-[#23395d] hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
