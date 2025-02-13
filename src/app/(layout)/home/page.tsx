import DatePlanner from '@/components/home/DatePlanner';
import DDayList from '@/components/home/DDayList';
import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-secondary min-h-screen p-4 flex flex-col  items-center gap-4">
      <DDayList />
      <DatePlanner />
    </div>
  );
}
