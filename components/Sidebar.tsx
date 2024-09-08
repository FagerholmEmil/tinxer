import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  const [isUpdateActive, setIsUpdateActive] = useState(false);
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);

  useEffect(() => {
    fetch("/topics.json")
      .then((response) => response.json())
      .then((data) => setTopics(data));
  }, []);

  const toggleTopic = (topic: string) => {
    setExpandedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const toggleUpdate = () => {
    setIsUpdateActive((prev) => !prev);
  };

  const toggleSubtopic = (subtopic: string) => {
    setSelectedSubtopics((prev) =>
      prev.includes(subtopic)
        ? prev.filter((s) => s !== subtopic)
        : [...prev, subtopic],
    );
  };

  return (
    <div
      className={`${className} flex flex-col gap-2 p-2 overflow-y-auto max-w-[400px]`}
    >
      {Object.entries(topics).map(([topic, subtopics]) => (
        <div key={topic} className="flex flex-col gap-1">
          <Button
            className="w-full flex justify-between items-center"
            variant="ghost"
            onClick={() => toggleTopic(topic)}
          >
            {topic}
            {expandedTopics.includes(topic) ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </Button>
          {expandedTopics.includes(topic) && (
            <div className="flex gap-1 flex-wrap">
              {Object.keys(subtopics).map((subtopic) => (
                <Button
                  key={subtopic}
                  variant={
                    selectedSubtopics.includes(subtopic) ? "default" : "outline"
                  }
                  className={`text-sm ${selectedSubtopics.includes(subtopic) ? "bg-primary text-primary-foreground" : ""}`}
                  onClick={() => toggleSubtopic(subtopic)}
                >
                  {subtopic}
                </Button>
              ))}
            </div>
          )}
        </div>
      ))}
      <Button
        className={`mt-2 ${isUpdateActive ? "bg-gray-800 hover:bg-gray-900" : "bg-gray-700 hover:bg-gray-800"} text-white`}
        onClick={toggleUpdate}
      >
        {isUpdateActive ? "Loading..." : "Update"}
      </Button>
    </div>
  );
};

export default Sidebar;
