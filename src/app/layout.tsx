'use client';

import { SessionProvider } from 'next-auth/react';
import Script from 'next/script';
import './styles/globals.css';
import './styles/font.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="max-w-screen-sm w-full mx-auto">
        <Script
          src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=6fcecb1512dd4dc3a592c1037eab94c2&libraries=services&autoload=false"
          strategy="beforeInteractive"
        />

        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
