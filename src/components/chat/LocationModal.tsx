import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useLocationStore } from '@/store/useLocationStore';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendLocation: (locationDescription: string) => void;
}

export default function LocationModal({ isOpen, onClose, onSendLocation }: LocationModalProps) {
  const { center, locationDescription, isLoading, fetchLocation } = useLocationStore();

  const [kakao, setKakao] = useState<typeof window.kakao | null>(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    window.kakao.maps.load(() => {
      setKakao(window.kakao);
    });
  }, []);

  useEffect(() => {
    if (isOpen && locationDescription === '') {
      fetchLocation();
    }
  }, [isOpen]);

  const handleSendLocation = () => {
    onSendLocation(locationDescription);
    onClose();
  };

  const handleCopyMapLink = () => {
    const mapLink = `https://map.kakao.com/link/map/${encodeURIComponent(locationDescription)},${center.lat},${center.lng}`;
    navigator.clipboard.writeText(mapLink).then(() => {
      alert('지도 링크가 복사되었습니다!');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative">
        <XMarkIcon className="size-5 absolute top-2 right-2 text-lg font-bold text-gray-600" onClick={onClose} />

        <h2 className="text-xl font-bold text-center mb-4">현재 위치</h2>

        {kakao && !isLoading ? (
          <>
            <Map center={center} className="w-[400px] h-[300px] rounded-lg shadow-md" level={3}>
              <MapMarker
                position={center}
                image={{
                  src: 'https://velog.velcdn.com/images/leeeee/post/97ff6b6d-37bc-4b8c-a083-89e02d788da8/image.png',
                  size: { width: 150, height: 100 },
                }}
              />
            </Map>
            <p className="text-center mt-2 text-lg">{locationDescription}</p>
          </>
        ) : (
          <div className="flex justify-center items-center w-[400px] h-[300px] rounded-2xl border border-neutral-200">
            <p>맵을 로딩 중입니다...</p>
          </div>
        )}

        <button onClick={handleSendLocation} className="bg-primary text-white px-4 py-2 rounded-lg w-full mt-4">
          위치 전송
        </button>

        <button onClick={handleCopyMapLink} className="bg-secondary text-white px-4 py-2 rounded-lg w-full mt-2">
          지도 링크 복사
        </button>
      </div>
    </div>
  );
}
