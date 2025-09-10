'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/shared/layout/Header';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isUploadPage = pathname === '/upload';
  
  return (
    <div className="min-h-screen bg-white">
      <Header variant={isUploadPage ? "upload" : "landing"} />
      {children}
    </div>
  );
}