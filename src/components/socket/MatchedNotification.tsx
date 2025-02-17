'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const SOCKET_SERVER_URL = 'ws://172.20.10.12:3000/notification';

interface MatchedNotificationProps {
  userId: string;
}

export default function MatchedNotification({ userId }: MatchedNotificationProps) {
  const router = useRouter();
  const { data: session } = useSession(); // 세션에서 accessToken 가져오기
  const accessToken = session?.accessToken; // 토큰 추출
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!userId || !accessToken) {
      console.log('❌ userId 또는 accessToken 없음 - 소켓 연결 안함');
      return;
    }

    console.log(`✅ 소켓 연결 시도: ${SOCKET_SERVER_URL} (userId: ${userId})`);
    console.log(`✅ 소켓 연결 시도: ${SOCKET_SERVER_URL} (accessToken: ${accessToken})`);
    console.log(socket);

    const newSocket: Socket = io(SOCKET_SERVER_URL, {
      query: {
        userId: userId, // userId 쿼리 파라미터로 추가
        token: `Bearer ${accessToken}`, // Bearer 토큰을 쿼리 파라미터로 전달
      },
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('🟢 소켓 연결 성공:', newSocket.id);
    });

    newSocket.on('connect_error', (err) => {
      console.error('❌ 소켓 연결 실패:', err.message);
    });

    newSocket.on('matchedNotification', (message: string) => {
      console.log('📩 새로운 알림 수신:', message);
      router.push('/home');
    });

    // 연결 해제를 나중에 수행할 예정이므로 여기서는 return 문이 필요 없습니다.
  }, [userId, accessToken]); // accessToken도 의존성에 추가

  return null; // UI에서 아무것도 안 보이게 설정!
}
