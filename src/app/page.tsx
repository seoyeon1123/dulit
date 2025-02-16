'use client';

import Image from 'next/image';
import KakaoLogin from '../assert/main/카카오_로그인.png';
import AppleLogin from '../assert/main/애플_로그인_원형.png';
import NaverLogin from '../assert/main/네이버_로그인_원형.png';
import { signIn } from 'next-auth/react';

export default function Page() {
  const handleKakaoLogin = () => {
    // 카카오 로그인 요청 시, 카카오 개발자 콘솔에서 설정한 callback URI를 사용
    signIn('kakao', {
      redirect: false,
      callbackUrl: '/chat',
    }).then((response) => {
      if (response?.url) {
        // 로그인 성공 후, /chat으로 리디렉션
        window.location.href = `${response.url}?redirectTo=/chat`;
      }
    });
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col justify-around items-center gap-20 py-10 w-full mx-0">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="text-primary font-bold text-8xl mb-8 font-YOnepickTTF">둘잇</h1>
        <p className="text-primary text-opacity-50">두 사람을 이어주는 특별한 공간</p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-center items-center mb-2">
          <div className="relative inline-block bg-primary rounded-full px-2.5 py-1.5 w-[200px]">
            <p className="text-white text-sm text-center">5초만에 빠른 회원가입</p>
            <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-[10px] border-transparent border-t-primary border-b-0"></div>
          </div>
        </div>

        <div onClick={handleKakaoLogin}>
          <Image src={KakaoLogin} alt="카카오 로그인" width={400} height={80} />
        </div>
        <div className="flex flex-row items-center mt-4">
          <hr className="border-b border-neutral-300 flex-1" />
          <p className="mx-4">또는</p>
          <hr className="border-b border-neutral-300 flex-1" />
        </div>
        <div className="flex flex-row justify-center items-center gap-6">
          <div onClick={() => signIn('naver', { redirect: true, callbackUrl: '/chat' })}>
            <Image src={NaverLogin} alt="네이버 로그인" width={60} height={60} />
          </div>
          <Image src={AppleLogin} alt="애플 로그인" width={60} height={60} />
        </div>
      </div>
    </div>
  );
}
