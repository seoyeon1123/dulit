'use client';

import LocationModal from '@/components/chat/LocationModal';
import Input from '@/components/share/Input';
import { MapPinIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';

export default function ChatRoom() {
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleSendLocation = (location: string) => {
    setMessage(location); // 메시지에 위치 설정
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <div className="flex items-center w-full p-4 relative">
        <h1 className="text-xl font-YOnepickTTF text-primary absolute left-1/2 transform -translate-x-1/2">
          채팅방 제목
        </h1>
        <MapPinIcon
          className="text-primary w-7 h-7 ml-auto cursor-pointer"
          onClick={() => setIsModalOpen(true)} // 모달 열기
        />
      </div>
      <hr className="w-full border-neutral-200 border" />

      {/* Chat messages container */}
      <div className="flex-grow p-4 space-y-4 overflow-auto">
        {/* Example message */}
        <div className="flex justify-start">
          <div className="bg-gray-200 p-2 rounded-lg max-w-xs">안녕하세요!</div>
        </div>
      </div>

      {/* Input and send button */}
      <div className="relative p-4 border-t border-neutral-200" style={{ bottom: '50px' }}>
        <div className="flex items-center w-full gap-2">
          <Input
            type="text"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            name="message"
          />
          <button
            onClick={handleSendMessage}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark">
            전송
          </button>
        </div>
      </div>

      {/* 모달 추가 */}
      <LocationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSendLocation={handleSendLocation} />
    </div>
  );
}
