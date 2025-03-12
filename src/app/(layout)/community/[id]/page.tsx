'use client';

import React from 'react';
import Image from 'next/image';
import textImage from '../../../../assert/calender/dateImage.jpeg';
import { EyeIcon, HeartIcon } from '@heroicons/react/24/outline';
import Comment from '@/components/community/Comment';
import { useParams } from 'next/navigation';

export default async function CommunityDetail() {
  const { id } = useParams();
  const paramsId = Number(id);
  console.log(paramsId);

  return (
    <div className="bg-secondary min-h-screen flex flex-col p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-4 items-center">
          <p className="border border-primary bg-white rounded-2xl text-sm px-2 py-1">Date</p>
          <h1 className="text-3xl">강서구 데이트 코스</h1>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <div className="size-8 rounded-full bg-gray-500" />
          <div>
            <p>user1</p>
            <p className="text-sm text-neutral-500">2025.03.07</p>
          </div>
        </div>
      </div>
      <hr className="border my-4 border-primary border-opacity-10" />
      <div className="flex flex-col gap-4">
        <p>
          안녕하세요! 강서구 데이트 코스 소개드릴게요~ 저희 커플은 까치산역 근처 거주하고 있어서 발산부터
          신정네,목동까지 되게 자주 돌아다니는데 오늘은 먹거리 위주로!! 맛집 데이트 코스 알려드릴게요
        </p>
        <Image src={textImage} alt="글이미지" width={300} height={300} />
        <div className="flex flex-row gap-2">
          <span className="bg-primary rounded-2xl text-base text-white px-2 py-1">#강서구</span>
          <span className="bg-primary rounded-2xl text-base text-white px-2 py-1">#데이트</span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center mt-5">
        <div className="flex flex-row gap-2 items-center">
          <EyeIcon className="size-5 text-neutral-500" />
          <p>10명이 봤어요</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <HeartIcon className="size-5 text-pink-600" />
          <p>6</p>
        </div>
      </div>
      <hr className="border my-4 border-primary border-opacity-10" />
      <Comment />
    </div>
  );
}
