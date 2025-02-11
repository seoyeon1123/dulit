import Navbar from '@/components/layout/Navbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <Navbar />
    </div>
  );
}
