"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useSettingsContext } from "./providers";
import { Card } from "./ui/card";

interface SidebarProps {
  className?: string;
}

interface TopicData {
  [key: string]: {
    [key: string]: {
      new: string;
      recent: string;
      search: string;
      categories?: string[];
    };
  };
}
const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [topics, setTopics] = useState<TopicData>({});
  const [expandedTopics, setExpandedTopics] = useState<string[]>([]);
  const { topic: flatTopics, setTopic: setFlatTopics } = useSettingsContext();

  const fetchTopics = useCallback(async () => {
    try {
      const response = await fetch("/topics.json");
      const data = await response.json();
      setTopics(data);
      console.log("Fetched topics:", data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const toggleSubtopic = (subtopic: string) => {
    setFlatTopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((s) => s !== subtopic)
        : [...prev, subtopic],
    );
  };

  return (
    <Card
      className={`${className} flex flex-col gap-2 p-4 overflow-y-auto max-w-[600px] mx-auto`}
    >
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {Object.entries(topics).map(([topic, subtopics]) => (
        <div key={topic} className="flex flex-col gap-1">
          <Button
            className="w-full flex justify-between items-center font-bold"
            variant="ghost"
            onClick={() => toggleTopic(topic)}
          >
            {topic}
            {!expandedTopics.includes(topic) ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </Button>
          {!expandedTopics.includes(topic) && (
            <div className="flex gap-1 flex-wrap">
              {Object.keys(subtopics).map((subtopic) => {
                return (
                  <Button
                    key={subtopic}
                    variant={
                      flatTopics.includes(subtopic) ? "default" : "outline"
                    }
                    className={`text-sm ${flatTopics.includes(subtopic) ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => toggleSubtopic(subtopic)}
                  >
                    {subtopic}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </Card>
  );
};

export default Sidebar;
