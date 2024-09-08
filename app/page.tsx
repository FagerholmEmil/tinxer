"use client";

import React from 'react';
import TinderCards from './components/TinderCards';

const Home: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <TinderCards />
    </div>
  );
};

export default Home;
