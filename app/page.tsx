"use client";

import React from "react";
import TinderCards from "../components/TinderCards";
import Image from "next/image";
import phone from "../assets/phone.svg";
import logo from "../assets/logo.svg";
import Sidebar from "@/components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <Image
          src={phone}
          alt="Phone logo"
          width={300}
          height={600}
          className="h-[90vh] mb-10 w-auto object-contain pointer-events-none select-none"
        />
        <Image
          src={logo}
          alt="TinXer"
          width={100}
          height={100}
          className=" absolute top-[12%] left-1/2 transform -translate-x-1/2 w-36 h-auto pointer-events-none select-none z-10"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[80%] h-[70%] overflow-hidden">
            <TinderCards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
