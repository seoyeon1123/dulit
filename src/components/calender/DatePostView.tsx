import Image from 'next/image';
import React, { useState } from 'react';
import date1 from '../../assert/calender/dateImage.jpeg';

export default function DatePostView() {
  const [click, setClick] = useState(false);
  return (
    <div className="bg-white flex flex-col justify-center items-center rounded-xl gap-3 p-4">
      <Image src={date1} alt="이미지" width={350} height={350} className="aspect-square self-center" />

      <div className="flex flex-col justify-start items-start w-full">
        <p className="text-neutral-500">2025년 2월 13일</p>
        <p className="text-lg font-semibold">병원 데이트</p>

        {/* ✅ w-full 추가해서 justify-between 정상 동작 */}
        <div className="flex flex-row justify-between items-center w-full">
          <p className="text-primary font-medium cursor-pointer" onClick={() => setClick((prev) => !prev)}>
            더보기 &gt;
          </p>
          <button className="text-red-500 font-medium">삭제하기</button>
        </div>

        {click && (
          <p className="my-2 bg-primary bg-opacity-85 text-white px-2 py-1 rounded-xl">
            오늘은 병원 데이트를 했따. 얘는 너무 몸이 약하다. 몸만 크다. 안은 골아있군.
          </p>
        )}
      </div>
    </div>
  );
}
