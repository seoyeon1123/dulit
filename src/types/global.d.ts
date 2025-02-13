/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Kakao {
    maps: {
      Map: new (container: HTMLElement, options: { center: Kakao.maps.LatLng; level: number }) => any;
      LatLng: new (lat: number, lng: number) => { getLat: () => number; getLng: () => number };
      services: {
        Geocoder: new () => {
          coord2RegionCode: (
            lng: number,
            lat: number,
            callback: (result: { address_name: string }[], status: string) => void,
          ) => void;
        };
        Status: {
          OK: string;
          FAIL: string;
        };
      };
    };
  }

  interface Window {
    kakao: Kakao;
  }
}

export {}; // To ensure this file is treated as a module
/* eslint-enable @typescript-eslint/no-explicit-any */
