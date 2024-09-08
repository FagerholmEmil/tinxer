import React from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent } from './ui/card';
import Sidebar from '../components/Sidebar';
import Link from 'next/link';

const ProfileContent: React.FC = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">Your Matches</h2>
                    <Link href="/matches" className="underline text-blue-700 text-sm font-semibold">3 matches</Link>
                </CardHeader>
                <CardContent>
                    {/* Add matches content here */}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold">
                        Liked Papers
                    </h2>
                        <Link href="/papers" className="underline text-blue-700 text-sm font-semibold">20 papers</Link>
                </CardHeader>
                <CardContent>
                    {/* Add liked papers content here */}
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-bold mb-4">Settings</h2>
                <Sidebar />
            </div>
        </div>
    );
};

export default ProfileContent;
