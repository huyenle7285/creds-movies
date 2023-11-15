import Link from 'next/link';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="bg-white h-full">
      <div className="flex flex-col m-auto max-w-[400px] w-full bg-slate-600">
        <div className="my-7 flex justify-center">
          <Link href="/" className="text-blue-300 underline">
            Home
          </Link>
        </div>
        {children}
      </div>
    </main>
  );
}
