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

          // 응답을 텍스트로 읽어봄
          const responseText = await res.text();
          console.log('백엔드 응답 내용:', responseText);

          // 응답이 JSON 형식일 경우에만 파싱 시도
          if (res.ok && res.headers.get('content-type')?.includes('application/json')) {
            const data = JSON.parse(responseText); // JSON 파싱
            console.log('백엔드 응답:', data);

            const { accessToken, refreshToken, user } = data;
            token.accessToken = accessToken;
            token.refreshToken = refreshToken;
            token.user = user;
          } else {
            throw new Error('백엔드에서 JSON 응답을 반환하지 않았습니다.');
          }
        } catch (error) {
          console.error('백엔드 로그인 실패:', error);
        }
      }

      return token;
    },

    async session({ session, token }): Promise<Session & { accessToken?: string; refreshToken?: string }> {
      console.log('세션:', session);
      console.log('token:', token);

      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        refreshToken: token.refreshToken as string | undefined,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
});

export { handler as GET, handler as POST };
