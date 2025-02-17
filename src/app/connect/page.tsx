'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import MatchedNotification from '@/components/socket/MatchedNotification';

interface IPartnerInfo {
  name: string;
  socialId: string;
  email: string;
}

export default function ConnectPage() {
  const { data: session } = useSession();
  const userSocialId = session?.socialId || '';
  const accessToken = session?.accessToken; // accessToken 가져오기
  const [partnerCode, setPartnerCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState<IPartnerInfo | null>(null); // partner 정보를 저장할 state
  const [showModal, setShowModal] = useState(false); // 모달 상태 관리

  const fetchPartnerInfo = async (partnerCode: string) => {
    if (!accessToken) return;

    try {
      const response = await fetch(`http://172.20.10.12:3000/user/partner/${partnerCode}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setPartnerInfo(data); // partner 정보를 state에 저장
        setShowModal(true); // 모달 띄우기
      } else {
        alert('상대방 정보를 가져오는 데 실패했습니다.');
      }
    } catch {
      alert('서버와의 연결에 문제가 발생했습니다.');
    }
  };

  const handleConnect = async () => {
    if (!partnerCode || !userSocialId) return;

    setIsLoading(true);

    // partnerCode로 유저 정보를 먼저 조회
    await fetchPartnerInfo(partnerCode);

    setIsLoading(false);
  };

  const handleConfirmConnection = async () => {
    if (!partnerInfo) return;

    try {
      const response = await fetch(`http://172.20.10.12:3000/user/connect/${partnerCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      if (data === true) {
        alert(`${partnerInfo.name}님과 연결되었습니다 ! 둘잇~`);
      }
    } catch {
      alert('서버와의 연결에 문제가 발생했습니다.');
    }

    setShowModal(false); // 모달 닫기
  };

  return (
    <div className="bg-secondary min-h-screen flex flex-col">
      {/* ✅ 소켓 연결을 위한 MatchedNotification 추가 */}
      {userSocialId && <MatchedNotification userId={userSocialId} />}

      <div className="flex flex-col justify-around items-center flex-grow">
        <h1 className="text-3xl font-bold text-primary mb-4">둘잇</h1>

        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl">커플 연결을 해주세요 💙</h2>
          <p className="text-base mb-14 bg-white bg-opacity-50 m-4 p-4 px-8 mt-0 rounded-lg text-center">
            내가 상대방의 코드를 입력하거나, 나의 코드를 상대방이 입력하면 연결할 수 있습니다!
          </p>

          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-base text-neutral-500 font-semibold">당신의 코드</h2>
            <p className="text-lg border-b border-black">{userSocialId}</p>
            <button className="bg-primary mt-6 text-white py-2 px-6 text-xl rounded-xl font-semibold hover:bg-opacity-80">
              복사하기
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center gap-2 ">
          <p className="text-base text-neutral-500 text-center">상대방 코드를 입력해주세요</p>

          <input
            type="text"
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value)}
            placeholder="상대방 코드 입력"
            className="p-1 w-32 max-w-full border-b border-primary bg-transparent outline-none text-center"
          />

          <button
            onClick={handleConnect}
            className={`mt-6 bg-primary text-white py-2 px-6 text-xl rounded-xl font-semibold hover:bg-opacity-80 ${isLoading ? 'opacity-50' : ''}`}
            disabled={isLoading}>
            {isLoading ? '연결 중...' : '연결하기'}
          </button>
        </div>
      </div>

      {/* 모달 */}
      {showModal && partnerInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80">
            <h3 className="text-2xl font-semibold text-center">{partnerInfo.name}과 연결하시겠습니까?</h3>
            <div className="flex justify-around mt-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 text-white py-2 px-6 rounded-lg">
                취소
              </button>
              <button onClick={handleConfirmConnection} className="bg-primary text-white py-2 px-6 rounded-lg">
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
