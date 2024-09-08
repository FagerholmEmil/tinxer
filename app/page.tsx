"use client";

import React from "react";
import TinderCards from "../components/TinderCards";
import Image from "next/image";
import phone from "../assets/phone.svg";
import logo from "../assets/logo.svg";
import Sidebar from "@/components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-end relative">
      <Sidebar className="absolute top-15 left-0 h-full" />
      <div className="relative mr-4">
        <Image
          src={phone}
          alt="Phone logo"
          width={300}
          height={600}
          className="w-auto object-contain p-4 pointer-events-none select-none"
        />
        <Image
          src={logo}
          alt="TinXer"
          width={100}
          height={100}
          className="mt-10 absolute top-[12%] left-1/2 transform -translate-x-1/2 w-36 h-auto pointer-events-none select-none"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[70%] overflow-hidden">
            <TinderCards />
          </div>
        </div>
        {/* New buttons container */}
        <div className="absolute bottom-[20%] left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button className="bg-white rounded-full p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
          <button className="bg-white rounded-full p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
