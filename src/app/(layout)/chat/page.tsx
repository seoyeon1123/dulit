import { MapPinIcon } from '@heroicons/react/24/outline';
import React from 'react';

export default function ChatRoom() {
  return (
    <div className="bg-secondary min-h-screen">
      <div className="flex items-center w-full p-4 relative">
        <h1 className="text-xl font-YOnepickTTF text-primary absolute left-1/2 transform -translate-x-1/2">
          채팅방 제목
        </h1>
        <MapPinIcon className="text-primary w-7 h-7 ml-auto" />
      </div>
      <hr className="w-full border-neutral-200 border" />
    </div>
  );
}
