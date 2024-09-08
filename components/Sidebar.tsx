import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

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

    useEffect(() => {
        fetch('/topics.json')
            .then(response => response.json())
            .then(data => setTopics(data));
    }, []);

    const toggleTopic = (topic: string) => {
        setExpandedTopics(prev =>
            prev.includes(topic)
                ? prev.filter(t => t !== topic)
                : [...prev, topic]
        );
    };

    return (
        <div className={`${className} flex flex-col gap-1 p-1 overflow-y-auto`}>
            {Object.entries(topics).map(([topic, subtopics]) => (
                <div key={topic}>
                    <Button
                        className="w-full flex justify-between items-center"
                        variant="outline"
                        onClick={() => toggleTopic(topic)}
                    >
                        {topic}
                        {expandedTopics.includes(topic) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </Button>
                    {expandedTopics.includes(topic) && (
                        <div className="ml-2 mt-1">
                            {Object.entries(subtopics).map(([subtopic, data]) => (
                                <div key={subtopic} className="mb-1">
                                    <Button className="w-full text-left" variant="default">
                                        {subtopic}
                                    </Button>
                                    <div className="grid grid-cols-3 gap-1 mt-1">
                                        {data.categories && data.categories.map(category => (
                                            <Button key={category} variant="outline" size="sm" className="col-span-3">
                                                {category}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <Button className="bg-gray-700 hover:bg-gray-800 text-white mt-2">
                Update
            </Button>
        </div>
    );
};

export default Sidebar;