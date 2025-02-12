import React from 'react';

export default function ConnectPage() {
  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      <div className="flex flex-col justify-around items-center flex-grow">
        <h1 className="text-3xl font-bold text-primary mb-4 font-YOnepickTTF">둘잇</h1>

        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl">커플 연결을 해주세요 💙</h2>
          <p className="text-base mb-14 bg-white bg-opacity-50 m-4 p-4 px-8 mt-0 rounded-lg text-center">
            내가 상대방의 코드를 입력하거나, 나의 코드를 상대방이 입력하면 연결할 수 있습니다!
          </p>

          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-base text-neutral-500 font-semibold">당신의 코드</h2>
            <p className="text-lg border-b border-black">34596721</p>
            <button className="bg-primary mt-6 text-white py-2 px-6 text-xl rounded-xl font-semibold hover:bg-opacity-80">
              복사하기
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 ">
          <p className="text-base text-neutral-500 text-center">만약, 상대방의 코드를 알고 있으신가요?</p>

          <input
            type="text"
            placeholder="상대방 코드 입력"
            className="p-1 w-32 max-w-full border-b border-primary bg-transparent outline-none text-center"
          />

          <button className="mt-6 bg-primary text-white py-2 px-6 text-xl rounded-xl font-semibold hover:bg-opacity-80">
            연결하기
          </button>
        </div>
      </div>
    </div>
  );
}
