import 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
    sub?: string;
    socialId: token.user.socialId;
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: string;
      name: string;
      email: string;
      image?: string;
    };
  }
}
