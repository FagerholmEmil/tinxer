import React, { useState } from 'react';
import { Button } from './ui/button';

interface SidebarProps {
    className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
    const [selectedButtons, setSelectedButtons] = useState<number[]>([]);

    const toggleButton = (index: number) => {
        setSelectedButtons(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index) 
                : [...prev, index]
        );
    };

    return (
        <div className={`${className} grid grid-cols-3 gap-0.5 p-0.5`}>
            {[...Array(18)].map((_, index) => (
                <Button 
                    key={index} 
                    className='text-sm py-0.5 px-1 rounded-md'
                    variant={selectedButtons.includes(index) ? 'default' : 'outline'}
                    onClick={() => toggleButton(index)}
                >
                    Physics
                </Button>
            ))}
            <Button className='bg-gray-700 hover:bg-gray-800 text-white col-span-3 mt-0.5 py-1'>
                Update
            </Button>
        </div>
    );
};

export default Sidebar;