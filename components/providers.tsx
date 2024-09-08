"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SettingsContextType {
  topic: string[];
  setTopic: React.Dispatch<React.SetStateAction<string[]>>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined,
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [topic, setTopic] = useState<string[]>([]);

  return (
    <SettingsContext.Provider value={{ topic, setTopic }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsContext must be used within a SettingsProvider",
    );
  }
  return context;
};
