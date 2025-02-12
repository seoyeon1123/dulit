import Image from 'next/image';
import React from 'react';
import Couple from '../../../assert/main/status/couple.png';

export default function StatusPage() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <div className="flex flex-col justify-around items-center flex-grow">
        <h1 className="text-3xl font-bold text-primary mb-4 font-YOnepickTTF">둘잇</h1>
        <div className="flex flex-col justify-center items-center gap-2">
          <Image src={Couple} alt="커플사진" width={300} height={30} />
          <h1 className="text-primary text-4xl text-bold mt-8">이서연</h1>
          <p>님과 연결하시겠습니까?</p>
        </div>
        <button className="mt-6 bg-primary text-white py-2 px-6 text-xl rounded-xl font-semibold hover:bg-opacity-80">
          연결하기
        </button>
      </div>
    </div>
  );
}
