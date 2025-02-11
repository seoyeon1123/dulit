import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // JWT 토큰 생성 시 카카오 ID와 액세스 토큰 저장
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.kakaoId = account.id;
      }
      return token;
    },

    // 세션 생성 시 유저 정보 추가
    async session({ session, token }) {
      session.user = {
        email: token.email as string,
        name: session.user?.name || null,
        kakaoId: token.kakaoId as string, // kakaoId 추가
        image: session.user?.image || null, // image 추가
      };

      // 유저 정보가 있을 때 NestJS 백엔드로 유저 정보 전송
      if (session.user) {
        try {
          const response = await fetch('http://localhost:3000/user/save', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              kakaoId: token.kakaoId,
              email: session.user.email,
              name: session.user.name,
              image: session.user.image,
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to save or login user');
          }

          console.log('User information processed successfully');
        } catch (error) {
          console.error('Error processing user information:', error);
        }
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
