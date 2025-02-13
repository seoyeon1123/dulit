'use client';
import { useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import Input from '../share/Input';
import { XCircleIcon } from '@heroicons/react/24/solid';

export default function DatePlanPlusModal() {
  const { closeDatePlanModal } = useModalStore();

  // 상태 관리
  const [icon, setIcon] = useState<string>('🍚');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');

  // 아이콘 선택 함수
  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
  };

  const handleSubmit = () => {
    // 폼 제출 처리
    console.log({ icon, location, type, date });
    closeDatePlanModal(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg relative w-96 flex flex-col gap-3">
        <XCircleIcon className="absolute top-3 right-3 text-primary size-7" onClick={closeDatePlanModal} />
        <h2 className="text-2xl font-bold mb-2 text-textColor">우리의 Date</h2>

        {/* 아이콘 선택 */}
        <div className="flex gap-3 mb-2">
          {['🍚', '🍿', '💪🏻', '✈️'].map((iconOption) => (
            <button
              key={iconOption}
              className={`text-3xl transition-opacity duration-300 ${
                icon === iconOption ? 'opacity-100' : 'opacity-50'
              }`}
              onClick={() => handleIconSelect(iconOption)}>
              {iconOption}
            </button>
          ))}
        </div>

        {/* 위치 선택 */}
        <Input
          type="text"
          placeholder="위치"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* 데이트 유형 선택 */}
        <Input
          type="text"
          placeholder="무슨 데이트인가요?"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        {/* 날짜 선택 */}
        <input
          type="date"
          name="date"
          value={date}
          className="border p-2 rounded-2xl w-full mb-2"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* 제출 버튼 */}
        <button onClick={handleSubmit} className="mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
          등록하기
        </button>
      </div>
    </div>
  );
}
