import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: '450px', // 작은 화면 (모바일)
        md: '768px', // 태블릿
        lg: '1024px', // 작은 데스크탑
        xl: '1280px', // 큰 데스크탑
        '2xl': '1536px',
      },
      colors: {
        primary: '#4F709C', // 메인 색상
        secondary: '#faefef', // 보조 색상
        textColor: '#4D4D4D', // 글자 색상
      },
      fontFamily: {
        YOnepickTTF: ['YOnepickTTF-Bold', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
