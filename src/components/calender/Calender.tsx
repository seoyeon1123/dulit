'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 추가
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import DatePostPluseModal from '@/components/calender/DatePostPluseModal';
import { useDateModalStore } from '@/store/DateModalStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;

export default function Calender() {
  const [date, setDate] = useState<Value | null>(null);
  const { isModalOpen, openModal } = useDateModalStore();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    setDate(new Date());
    setIsLoading(false);
  }, []);

  const handleDateChange = (value: Value) => {
    if (value) {
      const selected = Array.isArray(value) ? value[0] : value; // 배열일 경우 첫 번째 값 선택
      const formattedDate = selected.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      setSelectedDate(formattedDate);
      setDate(selected);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    const today = new Date().toLocaleDateString();
    const formattedDate = date.toLocaleDateString();

    let className = '';

    if (view === 'month') {
      if (formattedDate === selectedDate) {
        className = 'bg-primary text-white '; // 선택된 날짜 스타일
      } else if (formattedDate === today) {
        className = 'bg-orange-500 text-white '; // 오늘 날짜 스타일
      }
    }
    className += 'active:bg-primary';

    return className;
  };

  // 로딩 상태일 경우, 빈 요소 또는 로딩 메시지 표시
  if (isLoading || !date) {
    return (
      <div className="bg-secondary min-h-screen p-4 flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-xl font-YOnepickTTF text-primary text-center mb-4">데이트 기록</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <Calendar
            value={date}
            onChange={handleDateChange}
            tileClassName={tileClassName}
            className="react-calendar w-full rounded-lg border border-gray-300 bg-transparent"
          />
        </div>
      </div>

      <div className="mt-4 gap-2 flex flex-row justify-center items-center w-full">
        <div className="flex gap-1 flex-row justify-center items-center flex-grow">
          {selectedDate ? (
            <>
              <p className="text-base bg-primary text-white rounded-xl px-2 py-1">{selectedDate}</p>
              <p className="text-lg">의 우리의 기록</p>
            </>
          ) : (
            <p className="text-lg">날짜를 선택해주세요</p>
          )}
        </div>

        {selectedDate && <PlusCircleIcon className="size-8 text-[#3E5879] m-3" onClick={openModal} />}
      </div>

      {isModalOpen && <DatePostPluseModal selectedDate={selectedDate} />}
    </div>
  );
}
