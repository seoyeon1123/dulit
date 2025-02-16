import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import { Session } from 'next-auth';

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.kakaoAccessToken = account.access_token;

        // account.sub가 string이 아닐 경우 예외 처리
        if (typeof account.sub === 'string') {
          token.sub = account.sub;
        } else {
          token.sub = ''; // sub가 없거나 객체인 경우 빈 문자열로 처리
        }

        try {
          const res = await fetch('http://192.168.0.55:3000/auth/kakao/callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ kakaoAccessToken: account.access_token }),
          });

          console.log('백엔드 응답 상태 코드:', res.status);
          console.log('백엔드 응답 헤더:', res.headers.get('content-type'));

          const responseText = await res.text();
          console.log('백엔드 응답 내용:', responseText);

          if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
            const data = JSON.parse(responseText);
            console.log('백엔드 응답:', data);

            const { accessToken, refreshToken, user } = data;
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = user;
            token.sub = user.id;
          } else {
            throw new Error('백엔드에서 JSON 응답을 반환하지 않았습니다.');
          }
        } catch (error) {
          console.error('백엔드 로그인 실패:', error);
        }
      }

      return token;
    },

    async session({
      session,
      token,
    }): Promise<Session & { accessToken?: string; refreshToken?: string; sub?: string }> {
      console.log('세션:', session);
      console.log('token:', token);

      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        refreshToken: token.refreshToken as string | undefined,
        sub: token.sub || '', // sub가 없으면 빈 문자열로 처리
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
