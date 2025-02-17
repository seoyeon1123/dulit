'use client';

import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/router';

const SOCKET_SERVER_URL = 'http://localhost:3000/chat'; // 백엔드 서버 URL

export default function MatchedCoupleNotification() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newSocket: Socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    setSocket(newSocket);
    console.log(socket);

    // 매칭 성공 메시지 받기
    newSocket.on('sendMessage', (msg: string) => {
      console.log('📩 매칭 성공 메시지 수신:', msg);
      setMessage(msg);

      // 3초 후에 자동으로 /home으로 리디렉션
      setTimeout(() => {
        router.push('/home');
      }, 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {message ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{message}</h2>
          <p>잠시 후, 채팅 페이지로 이동합니다...</p>
        </>
      ) : (
        <p>매칭을 기다리고 있습니다...</p>
      )}
    </div>
  );
}
