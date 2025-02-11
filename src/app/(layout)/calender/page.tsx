'use client';

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일을 추가
import '../../styles/globals.css'; // 글로벌 스타일 파일

export default function CalendarPage() {
  const [date, setDate] = useState<Date | null>(null); // 초기값을 null로 설정
  const [selectedDate, setSelectedDate] = useState<string>(''); // 선택한 날짜를 저장할 상태

  useEffect(() => {
    setDate(new Date());
  }, []); // 컴포넌트가 마운트될 때만 실행

  const handleDateChange = (newDate: Date | Date[] | null) => {
    if (newDate) {
      const formattedDate = (
        newDate instanceof Date ? newDate : newDate[0]
      ).toLocaleDateString();
      setSelectedDate(formattedDate); // 선택된 날짜 상태 업데이트
      setDate(newDate instanceof Date ? newDate : newDate[0]); // 선택된 날짜 업데이트
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

  if (date === null) {
    return <div>Loading...</div>; // 초기 로딩 상태
  }

  return (
    <div className="bg-secondary min-h-screen p-4">
      {/* 텍스트와 달력 사이의 간격을 주기 위해 margin-top을 설정 */}
      <h1 className="text-xl font-YOnepickTTF text-primary text-center mb-4">
        데이트 기록
      </h1>
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
