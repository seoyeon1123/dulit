'use client';

import { PlusCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import DDayCard from './DDayCard';
import { useModalStore } from '@/store/modalStore';
import DDayPlusModal from './DDayPlusModal';

export default function DDayList() {
  const { isDDayModalOpen, openDDayModal } = useModalStore();
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 3; // 한 페이지에 보여줄 카드 수

  // 카드 데이터를 배열로 만들어 사용
  const cards = [
    { title: '우리 만난지', dday: 924, date: '2022.08.04' },
    { title: '여행', dday: 13, date: '2025.04.02' },
    { title: '여행', dday: 13, date: '2025.04.02' },
    { title: '우리 만난지1', dday: 924, date: '2022.08.04' },
    { title: '여행1', dday: 13, date: '2025.04.02' },
    { title: '여행1', dday: 13, date: '2025.04.02' },
    { title: '우리 만난지2', dday: 924, date: '2022.08.04' },
    { title: '여행2', dday: 13, date: '2025.04.02' },
    { title: '여행2', dday: 13, date: '2025.04.02' },
  ];

  const totalCards = cards.length; // 동적으로 카드 개수

  // 페이지 이동 함수
  const nextPage = () => {
    if ((currentPage + 1) * cardsPerPage < totalCards) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white bg-opacity-50 p-3 rounded-2xl">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-3xl text-[#3E5879] font-bold">D-DAY</h2>
        <PlusCircleIcon className="size-8 text-[#3E5879] m-3" onClick={openDDayModal} />
      </div>

      {/* 카드 슬라이더 */}
      <div className="overflow-hidden">
        <div className="grid grid-cols-1 gap-2">
          {cards.slice(currentPage * cardsPerPage, (currentPage + 1) * cardsPerPage).map((card, index) => (
            <DDayCard key={index} title={card.title} dday={card.dday} date={card.date} />
          ))}
        </div>
      </div>

      {/* 좌우 슬라이드 버튼 */}
      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-[#3E5879] text-white rounded-full disabled:opacity-50">
          Prev
        </button>
        <button
          onClick={nextPage}
          disabled={(currentPage + 1) * cardsPerPage >= totalCards}
          className="px-4 py-2 bg-[#3E5879] text-white rounded-full disabled:opacity-50">
          Next
        </button>
      </div>

      {isDDayModalOpen && <DDayPlusModal />}
    </div>
  );
}
