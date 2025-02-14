import { create } from 'zustand';

interface LocationState {
  center: { lat: number; lng: number };
  locationDescription: string;
  isLoading: boolean;
  fetchLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  center: { lat: 33.450701, lng: 126.570667 },
  locationDescription: '',
  isLoading: true,
  fetchLocation: () => {
    if (navigator.geolocation) {
      set({ isLoading: true });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // 주소 변환 API 호출
          if (window.kakao?.maps?.services) {
            const geocoder = new window.kakao.maps.services.Geocoder();
            geocoder.coord2RegionCode(longitude, latitude, (result, status) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address_name;
                set({
                  center: { lat: latitude, lng: longitude },
                  locationDescription: `현재 ${address} 근처입니다.`,
                  isLoading: false,
                });
              } else {
                set({
                  center: { lat: latitude, lng: longitude },
                  locationDescription: '현재 위치를 찾을 수 없습니다.',
                  isLoading: false,
                });
              }
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          set({ isLoading: false });
        },
      );
    }
  },
}));
