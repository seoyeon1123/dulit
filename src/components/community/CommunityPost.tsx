import Image from 'next/image';
import React from 'react';

import date from '../../assert/calender/병원데이트.jpeg';

interface ICommunityPost {
  title: string;
  content: string;
  category: string;
}

export default function CommunityPost({ title, content, category }: ICommunityPost) {
  const text =
    ' 안녕하세요! 강서구 데이트 코스 소개드릴게요~ 저희 커플은 까치산역 근처 거주하고 있어서 발산부터 신정네,목동까지 되게 자주 돌아다니는데 오늘은 먹거리 위주로!! 맛집 데이트 코스 알려드릴게요!';
  return (
    <div className="px-5 flex flex-col gap-5">
      <div className="flex flex-row gap-2 border-b border-neutral-300 py-5 last:border-none">
        <div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-primary bg-white font-bold px-2 py-1 text-sm rounded-2xl">{category}</div>
            <h1 className="font-bold text-base">{title}</h1>
          </div>
          <p className="text-sm text-neutral-500">{content.length > 100 ? `${content.slice(0, 100)}...` : text}</p>
        </div>
        <Image src={date} alt="date" width={100} height={100} className="rounded-2xl aspect-square" />
      </div>
    </div>
  );
}
