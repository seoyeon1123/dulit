'use client';

import { useModalStore } from '@/store/modalStore';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import DatePlanPlusModal from './DatePlanPlusModal';

export default function DatePlanner() {
  const { isDatePlanModalOpen, openDatePlanModal } = useModalStore();

  const datePlans = [
    { icon: '🎬', location: '홍대', type: '영화 보기', date: '2025년 2월 14일 (수)' },
    { icon: '🍚', location: '강남', type: '떡도리탕 먹으러 가기', date: '2025년 2월 15일 (목)' },
  ];

  return (
    <div className="bg-white bg-opacity-50 p-3 rounded-2xl w-full">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-3xl text-[#3E5879] font-bold">When Date ？</h2>
        <PlusCircleIcon className="size-8 text-[#3E5879] m-3" onClick={openDatePlanModal} />
      </div>
      <ul>
        {datePlans.map((plan, index) => (
          <li
            key={index}
            className="flex items-center space-x-4 p-4 border-b border-neutral-300 last:border-none justify-between gap-6">
            <div className="flex flex-row gap-2">
              <span>{plan.icon}</span>
              <span className="text-textColor">{plan.type}</span>
            </div>
            <p className="text-neutral-400 text-sm">{plan.date}</p>
          </li>
        ))}
      </ul>

      {isDatePlanModalOpen && <DatePlanPlusModal />}
    </div>
  );
}
