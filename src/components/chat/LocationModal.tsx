import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendLocation: (locationDescription: string) => void;
}

export default function LocationModal({ isOpen, onClose, onSendLocation }: LocationModalProps) {
  const [kakao, setKakao] = useState<typeof window.kakao | null>(null);
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    errMsg: null,
    isLoading: true,
  });

  const [isFetchingLocation, setIsFetchingLocation] = useState(true);
  const [isCurrentLocationVisible, setIsCurrentLocationVisible] = useState(false);
  const [locationDescription, setLocationDescription] = useState('');

  // 카카오맵 SDK 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=6fcecb1512dd4dc3a592c1037eab94c2&libraries=services&autoload=false';
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      if (window.kakao && window.kakao.maps) {
        setKakao(window.kakao);
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 위치 가져오기
  useEffect(() => {
    if (kakao && navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setState((prev) => ({
            ...prev,
            center: {
              lat: latitude,
              lng: longitude,
            },
            isLoading: false,
          }));
          setIsFetchingLocation(false);
          setIsCurrentLocationVisible(true);

          // 주소 변환 API 호출
          if (kakao.maps && kakao.maps.services) {
            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
              if (status === kakao.maps.services.Status.OK) {
                const address = result[0].address_name;
                setLocationDescription(`현재 ${address} 근처입니다.`);
              } else {
                setLocationDescription('현재 위치를 찾을 수 없습니다.');
              }
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsFetchingLocation(false);
        },
      );
    }
  }, [kakao]);

  const handleSendLocation = () => {
    onSendLocation(locationDescription);
    onClose();
  };

  const handleCopyMapLink = () => {
    const mapLink = `https://map.kakao.com/link/map/${encodeURIComponent(locationDescription)},${state.center.lat},${state.center.lng}`;
    navigator.clipboard.writeText(mapLink).then(() => {
      alert('지도 링크가 복사되었습니다!');
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg font-bold text-gray-600">
          X
        </button>

        <h2 className="text-xl font-bold text-center mb-4">현재 위치</h2>

        {kakao && !state.isLoading ? (
          <>
            <Map center={state.center} className="w-[400px] h-[300px] rounded-lg shadow-md" level={3}>
              {isFetchingLocation && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-30 z-10">
                  <p className="text-lg font-bold text-gray-700">현재 위치를 불러오는 중입니다...</p>
                </div>
              )}

              {isCurrentLocationVisible && (
                <MapMarker
                  position={state.center}
                  image={{
                    src: 'https://velog.velcdn.com/images/leeeee/post/97ff6b6d-37bc-4b8c-a083-89e02d788da8/image.png',
                    size: { width: 150, height: 100 },
                  }}
                />
              )}
            </Map>
            <p className="text-center mt-2 text-lg">{locationDescription}</p>
          </>
        ) : (
          <div className="flex justify-center items-center">
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
