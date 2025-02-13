import React from 'react';

interface IDateProps {
  title: string;
  dday: number;
  date: string;
}

export default function DDayCard({ title, dday, date }: IDateProps) {
  return (
    <div className="relative bg-white rounded-2xl h-20 w-96 p-5 flex justify-between items-center *:text-[#E48586] *:font-bold mb-2 last:mb-0">
      <h1 className="text-2xl">{title}</h1>

      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">❤️</div>

      <div className="text-center flex flex-col gap-1">
        <p className="text-lg">{dday}일</p>
        <p className="text-sm text-[#FFE6E6]">{date}</p>
      </div>
    </div>
  );
}
