import React from 'react';
import Input from '../share/Input';
import Button from '../share/Button';
import { useDateModalStore } from '@/store/DateModalStore';
import ImageUpload from './ImageUpload';
import { XCircleIcon } from '@heroicons/react/24/outline';

interface IDatePostPlusProps {
  selectedDate: string;
}

export default function DatePostPluseModal({ selectedDate }: IDatePostPlusProps) {
  const { closeModal } = useDateModalStore();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg relative w-96 flex flex-col gap-5">
        <div className="flex flex-row items-center justify-between">
          <p className="bg-primary text-white font-semibold text-lg px-3 py-1 rounded-xl shadow-md inline-block">
            {selectedDate} 🗓️
          </p>

          <XCircleIcon className="size-8 text-primary" onClick={closeModal} />
        </div>
        <div>
          <p className="text-sm text-neutral-500 mb-1">데이트에 남는건 사진 📸</p>
          <ImageUpload />
        </div>
        <div>
          <p className="text-sm text-neutral-500 mb-1">
            우리의 데이트는 어떤 특별한 순간이었나요? <strong className="text-lg">🤔</strong>
          </p>
          <Input type="text" placeholder="예: 영화 관람, 공원 산책 등" name="datePostTitle" />
        </div>
        <div>
          <p className="text-sm text-neutral-500 mb-1">
            이번 데이트를 자세히 기록해주세요! <strong className="text-lg">✍🏻</strong>
          </p>
          <textarea
            className="px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1
    focus:ring-primary focus:border-primary transition duration-300 ease-in-out w-full min-h-36"
            placeholder="내용을 입력하세요"
          />
        </div>
        <Button describe="추가하기" handleSubmit={closeModal} />
      </div>
    </div>
  );
}
