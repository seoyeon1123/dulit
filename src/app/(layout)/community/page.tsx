'use client';

import React, { useState } from 'react';
import CommunityPost from '@/components/community/CommunityPost';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { useCommunityModalStore } from '@/store/CommunityModalStore';
import CommunityPostAddModal from '@/components/community/CommunityPostAddModal';

export default function CommunityPage() {
  const communityData = [
    { id: 1, category: 'Date', title: '강서구 데이트 코스', content: '맛집 데이트 코스 알려드릴게요!' },
    { id: 2, category: 'Travel', title: '제주도 여행 코스', content: '제주도의 핫플을 소개합니다!' },
  ];
  const { isModalOpen, openModal } = useCommunityModalStore();
  const [selectedTab, setSelectedTab] = useState('date');
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <div className="flex flex-row justify-between items-center m-5">
        <div className="flex flex-row gap-3 text-black text-3xl font-semibold ">
          <button
            className={`${selectedTab === '전체' ? 'text-primary' : 'text-black'}`}
            onClick={() => setSelectedTab('전체')}>
            전체
          </button>
          <button
            className={`${selectedTab === 'Date' ? 'text-primary' : 'text-black'}`}
            onClick={() => setSelectedTab('Date')}>
            데이트
          </button>
          <button
            className={`${selectedTab === 'Travel' ? 'text-primary' : 'text-black'}`}
            onClick={() => setSelectedTab('Travel')}>
            여행
          </button>
        </div>
        <PlusCircleIcon onClick={() => openModal()} className="size-8 text-primary" />
      </div>

      <div>
        {communityData
          .filter((item) => selectedTab === '전체' || item.category === selectedTab) // 전체 탭 선택 시 모든 데이터 표시
          .map((post) => (
            <CommunityPost key={post.id} title={post.title} content={post.content} category={post.category} />
          ))}
      </div>

      {isModalOpen && <CommunityPostAddModal />}
    </div>
  );
}
