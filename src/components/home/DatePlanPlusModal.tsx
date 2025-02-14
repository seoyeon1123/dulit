'use client';
import { useState } from 'react';
import { useModalStore } from '@/store/modalStore';
import Input from '../share/Input';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { useLocationHome } from '@/store/useLocationHome';
import { MapIcon } from '@heroicons/react/24/outline';

export default function DatePlanPlusModal() {
  const { closeDatePlanModal } = useModalStore();
  const { fetchLocation } = useLocationHome(); // zustand 사용하여 위치 상태 관리

  // 상태 관리
  const [icon, setIcon] = useState<string>('🍚');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]); // 검색 결과 리스트 상태 관리

  // 아이콘 선택 함수
  const handleIconSelect = (selectedIcon: string) => {
    setIcon(selectedIcon);
  };

  const handleSearchLocation = () => {
    if (window.kakao && window.kakao.maps) {
      const ps = new kakao.maps.services.Places();
      ps.keywordSearch(location, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // 여기서 `data`는 장소명(`place_name`)을 포함한 검색 결과입니다.
          setSearchResults(data); // 장소 검색 결과를 상태에 설정
        } else {
          setSearchResults([]); // 결과가 없으면 초기화
          alert('장소를 찾을 수 없습니다.');
        }
      });
    } else {
      alert('카카오맵 API가 로드되지 않았습니다.');
    }
  };

  const handleSelectLocation = (lat: number, lng: number, placeName: string) => {
    fetchLocation(lat, lng); // 위치 상태 업데이트
    setLocation(placeName); // 선택된 장소명으로 업데이트
    setSearchResults([]); // 검색 결과 리스트 초기화
  };

  const handleSubmit = () => {
    // 폼 제출 처리
    console.log({ icon, location, type, date });
    closeDatePlanModal(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-secondary p-6 rounded-lg shadow-lg relative w-96 flex flex-col gap-3">
        <XCircleIcon className="absolute top-3 right-3 text-primary size-7" onClick={closeDatePlanModal} />
        <h2 className="text-2xl font-bold mb-2 text-textColor">우리의 Date</h2>

        {/* 아이콘 선택 */}
        <div className="flex justify-center gap-5 ">
          {['🍚', '🍿', '💪🏻', '✈️'].map((iconOption) => (
            <button
              key={iconOption}
              className={`text-3xl transition-opacity duration-300 ${
                icon === iconOption ? 'opacity-100' : 'opacity-25'
              }`}
              onClick={() => handleIconSelect(iconOption)}>
              {iconOption}
            </button>
          ))}
        </div>

        {/* 위치 검색 */}
        <Input
          type="text"
          placeholder="위치 검색"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleSearchLocation} className="bg-primary text-white px-4 py-2 rounded-lg w-full">
          위치 검색
        </button>

        {/* 검색 결과 리스트 */}
        {searchResults.length > 0 && (
          <div className="max-h-48 overflow-y-auto rounded-lg shadow-lg border border-gray-300 bg-white">
            <ul className="space-y-3 p-2">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className="cursor-pointer flex items-center mx-3 gap-4 p-3  hover:bg-primary-light transition-all duration-300 ease-in-out transform hover:scale-105  border-b border-neutral-200 last:border-none"
                  onClick={() => handleSelectLocation(Number(result.y), Number(result.x), result.place_name)}>
                  {/* 아이콘 */}

                  <MapIcon className="size-6 text-orange-500" />

                  {/* 장소명 */}
                  <div className="flex-1">
                    <p className="text-base font-semibold text-textColor">{result.place_name}</p>
                    <p className="text-sm text-gray-500">{result.address_name}</p> {/* 주소 */}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 데이트 유형 선택 */}
        <Input
          type="text"
          placeholder="무슨 데이트인가요?"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        />

        {/* 날짜 선택 */}
        <input
          type="date"
          name="date"
          value={date}
          className="border p-2 rounded-2xl w-full mb-2"
          onChange={(e) => setDate(e.target.value)}
        />

        {/* 제출 버튼 */}
        <button onClick={handleSubmit} className="mt-4 bg-primary text-white py-2 rounded-lg hover:bg-primary-dark">
          등록하기
        </button>
      </div>
    </div>
  );
}
