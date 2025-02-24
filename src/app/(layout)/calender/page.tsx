'use client';

import React from 'react';
import 'react-calendar/dist/Calendar.css'; // 기본 스타일 추가
import '../../styles/globals.css'; // 글로벌 스타일 파일
import Calender from '@/components/calender/Calender';
import DatePostView from '@/components/calender/DatePostView';

export default function CalendarPage() {
  return (
    <div className="bg-secondary min-h-screen p-4 mb-10">
      <Calender />
      <DatePostView />
    </div>
  );
}
