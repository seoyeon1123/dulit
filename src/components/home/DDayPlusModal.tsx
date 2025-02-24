'use client';
import { useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import Input from '../share/Input';
import { XCircleIcon } from '@heroicons/react/24/solid';
import Button from '../share/Button';

export default function DDayPlusModal() {
  const { closeDDayModal } = useModalStore();
  const [type, setType] = useState<'dating' | 'event'>('dating'); // 디데이 유형 상태 관리
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (type === 'dating') {
      console.log(`사귄 날: ${date}부터 D-Day 계산`);
    } else {
      console.log(`이벤트 날짜: ${date}까지 남은 D-Day 계산`);
    }
    closeDDayModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg relative w-96 flex flex-col gap-3">
        <XCircleIcon className="absolute top-3 right-3 text-primary size-7" onClick={closeDDayModal} />
        <h2 className="text-2xl font-bold mb-2 text-textColor">우리의 D-Day</h2>

        {/* 유형 선택 */}
        <div className="flex items-center gap-3 mb-2 relative">
          <button
            className={`flex-1 p-2 rounded text-lg ${type === 'dating' ? 'text-primary font-bold' : 'text-neutral-400'}`}
            onClick={() => setType('dating')}>
            기념일
          </button>

          {/* 가운데 구분선 */}
          <div className="w-px h-5 bg-neutral-500"></div>

          <button
            className={`flex-1 p-2 rounded text-lg ${type === 'event' ? 'text-primary font-bold' : 'text-neutral-400'}`}
            onClick={() => setType('event')}>
            이벤트
          </button>
        </div>

        <Input type="text" placeholder="제목" name="ddayname" />
        <input
          type="date"
          className="border p-2 rounded-2xl w-full mb-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Button describe="추가하기" handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}
