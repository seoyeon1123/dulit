'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 추가
import '../../styles/globals.css'; // 글로벌 스타일 파일

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;

export default function CalendarPage() {
  const [date, setDate] = useState<Value>(new Date()); // 초기값을 new Date()로 설정
  const [selectedDate, setSelectedDate] = useState<string>(''); // 선택한 날짜 상태

  useEffect(() => {
    setDate(new Date());
  }, []); // 컴포넌트 마운트 시 실행

  const handleDateChange = (value: Value) => {
    if (value) {
      const selected = Array.isArray(value) ? value[0] : value; // 배열일 경우 첫 번째 값 선택
      const formattedDate = selected.toLocaleDateString();
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
        className = 'bg-primary text-white rounded-full'; // 선택된 날짜 스타일
      } else if (formattedDate === today) {
        className = 'bg-orange-500 text-white rounded-full'; // 오늘 날짜 스타일
      }
    }

    // hover 상태에서 rounded-full 적용
    className += ' hover:rounded-full';

    return className;
  };

  return (
    <div className="bg-secondary min-h-screen p-4">
      <h1 className="text-xl font-YOnepickTTF text-primary text-center mb-4">데이트 기록</h1>
      <div className="flex justify-center">
        <div className="w-full max-w-sm">
          <Calendar
            value={date}
            onChange={handleDateChange} // 이벤트 파라미터도 받을 수 있도록 수정
            tileClassName={tileClassName}
            className="react-calendar w-full rounded-lg border border-gray-300 bg-transparent"
          />
        </div>
      </div>
      <p className="mt-4 text-lg text-gray-700">선택한 날짜: {selectedDate}</p>
    </div>
  );
}
