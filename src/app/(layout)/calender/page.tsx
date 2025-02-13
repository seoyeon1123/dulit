'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 추가
import '../../styles/globals.css'; // 글로벌 스타일 파일

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;

export default function CalendarPage() {
  const [date, setDate] = useState<Value | null>(null); // date 초기값을 null로 설정
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    setDate(new Date());
    setIsLoading(false); // 컴포넌트가 마운트되면 로딩을 종료
  }, []);

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

  // 로딩 상태일 경우, 빈 요소 또는 로딩 메시지 표시
  if (isLoading || !date) {
    return (
      <div className="bg-secondary min-h-screen p-4 flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-secondary min-h-screen p-4">
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
      <p className="mt-4 text-lg text-gray-700">선택한 날짜: {selectedDate}</p>
    </div>
  );
}
