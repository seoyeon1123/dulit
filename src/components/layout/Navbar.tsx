'use client';

import Link from 'next/link';
import {
  HomeIcon as OutlineHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  UserGroupIcon as OutlineUserGroupIcon,
  CalendarDateRangeIcon as OutlineCalenderIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as SolidHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  UserGroupIcon as SoildUserGroupIcon,
  CalendarDateRangeIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

export default function TabBar() {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-4 border-neutral-300 border-t px-5 py-3 *:text-black bg-secondary">
        <Link href="/home" className="flex flex-col items-center gap-px">
          {pathname === '/home' ? (
            <SolidHomeIcon className="size-7 text-primary" />
          ) : (
            <OutlineHomeIcon className="size-7" />
          )}
        </Link>

        <Link href="/chat" className="flex flex-col items-center gap-px">
          {pathname === '/chat' ? (
            <SolidChatIcon className="size-7 text-primary" />
          ) : (
            <OutlineChatIcon className="size-7" />
          )}
        </Link>
        <Link href="/calender" className="flex flex-col items-center gap-px">
          {pathname === '/calender' ? (
            <CalendarDateRangeIcon className="size-7 text-primary" />
          ) : (
            <OutlineCalenderIcon className="size-7" />
          )}
        </Link>
        <Link href="/community" className="flex flex-col items-center gap-px">
          {pathname === '/community' ? (
            <SoildUserGroupIcon className="size-7 text-primary" />
          ) : (
            <OutlineUserGroupIcon className="size-7" />
          )}
        </Link>
      </div>
    </>
  );
}
