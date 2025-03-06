import Image from 'next/image';
import React from 'react';

import dateImage from '../../assert/calender/병원데이트.jpeg';

interface ICommunityPost {
  title: string;

  category: string;
  text: string;
}

export default function CommunityPost({ title, category, text }: ICommunityPost) {
  return (
    <div className="px-5 flex flex-col gap-5">
      <div className="flex flex-row gap-2 border-b border-neutral-300 py-5 last:border-none">
        <div>
          <div className="flex flex-row gap-2 items-center">
            <div className="text-primary bg-white font-bold px-2 py-1 text-sm rounded-2xl">{category}</div>
            <h1 className="font-bold text-base">{title}</h1>
          </div>
          <p className="text-sm text-neutral-500">{text.length > 100 ? `${text.slice(0, 100)}...` : text}</p>
        </div>
        <Image src={dateImage} alt="date" width={100} height={100} className="rounded-2xl aspect-square" />
      </div>
    </div>
  );
}
