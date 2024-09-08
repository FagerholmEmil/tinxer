import React from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardContent } from './ui/card';
import Sidebar  from '../components/Sidebar';

const ProfileContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Your Matches</h2>
          <p className="text-xl font-semibold">False</p>
        </CardHeader>
        <CardContent>
          {/* Add matches content here */}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Liked Papers</h2>
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
