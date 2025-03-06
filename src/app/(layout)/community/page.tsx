'use client';

import React, { useState } from 'react';
import CommunityPost from '@/components/community/CommunityPost';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useCommunityModalStore } from '@/store/CommunityModalStore';
import CommunityPostAddModal from '@/components/community/CommunityPostAddModal';
import Link from 'next/link';

export default function CommunityPage() {
  const communityData = [
    {
      id: 1,
      category: 'Date',
      title: '강서구 데이트 코스',

      text: '안녕하세요! 강서구 데이트 코스 소개드릴게요~ 저희 커플은 까치산역 근처 거주하고 있어서 발산부터 신정네,목동까지 되게 자주 돌아다니는데 오늘은 먹거리 위주로!! 맛집 데이트 코스 알려드릴게요',
    },
    {
      id: 2,
      category: 'Travel',
      title: '제주도 여행 코스',

      text: '안녕하세요! 강서구 데이트 코스 소개드릴게요~ 저희 커플은 까치산역 근처 거주하고 있어서 발산부터 신정네,목동까지 되게 자주 돌아다니는데 오늘은 먹거리 위주로!! 맛집 데이트 코스 알려드릴게요',
    },
  ];
  const { isModalOpen, openModal } = useCommunityModalStore();
  const [selectedTab, setSelectedTab] = useState('전체');
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <div className="flex flex-row justify-between items-center m-5">
        <div className="flex flex-row gap-3 text-black text-3xl font-semibold ">
          <button
            className={`text-black ${selectedTab === '전체' ? 'text-primary font-bold' : ''}`}
            onClick={() => setSelectedTab('전체')}>
            전체
          </button>
          <button
            className={`text-black ${selectedTab === 'Date' ? 'text-primary font-bold' : ''}`}
            onClick={() => setSelectedTab('Date')}>
            데이트
          </button>
          <button
            className={`text-black ${selectedTab === 'Travel' ? 'text-primary font-bold' : ''}`}
            onClick={() => setSelectedTab('Travel')}>
            여행
          </button>
        </div>
        <PlusCircleIcon onClick={() => openModal()} className="size-8 text-primary" />
      </div>

      <div>
        {communityData
          .filter((item) => selectedTab === '전체' || item.category === selectedTab)
          .map((post) => (
            <Link href={`/community/${post.id}`} key={post.id}>
              <CommunityPost key={post.id} title={post.title} category={post.category} text={post.text} />
            </Link>
          ))}
      </div>

      {isModalOpen && <CommunityPostAddModal />}
    </div>
  );
}
