import React from 'react';

export default function HomePage() {
  return (
    <div className="bg-secondary min-h-screen p-4 flex flex-col  items-center">
      <h1 className="text-xl font-YOnepickTTF text-primary text-center mb-5">홈</h1>
      <div className="relative bg-[#FFD0D0] rounded-2xl h-28 w-96 p-5 flex justify-between items-center *:text-[#E48586] *:font-bold">
        <h1 className="text-2xl">우리 만난지</h1>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">❤️</div>

        <div className="text-center flex flex-col gap-1">
          <p className="text-lg">923일</p>
          <p className="text-sm text-[#FFE6E6]">2022.08.04</p>
        </div>
      </div>

      <div className="relative bg-[#FFD0D0] rounded-2xl h-28 w-96  p-5 flex justify-between items-center *:text-[#E48586] *:font-bold mt-5">
        <h1 className="text-2xl">여행</h1>

        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">❤️</div>

        <div className="text-center flex flex-col gap-1">
          <p className="text-lg">D-32</p>
          <p className="text-sm text-[#FFE6E6]">2025.04.01</p>
        </div>
      </div>
    </div>
  );
}
