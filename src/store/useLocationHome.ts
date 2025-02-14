import { create } from 'zustand';

interface LocationState {
  center: { lat: number; lng: number };
  locationDescription: string;
  fetchLocation: (lat: number, lng: number) => void;
}

export const useLocationHome = create<LocationState>((set) => ({
  center: { lat: 33.450701, lng: 126.570667 }, // 기본값 설정
  locationDescription: '',
  fetchLocation: (lat, lng) =>
    set({
      center: { lat, lng },
    }),
}));
