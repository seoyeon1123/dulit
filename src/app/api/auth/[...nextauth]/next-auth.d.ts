// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      email: string;
      name: string | null;
      image: string | null;
      kakaoId: string | null; // kakaoId 추가
      naverId?: string | null;
    };
  }
}
