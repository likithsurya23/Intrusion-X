"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin') && pathname !== '/admin-login';

  if (isAdminRoute) {
    // Admin routes occupy the full screen width, using their own layouts
    return (
      <main className="flex-grow flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    );
  }

  // Non-admin routes are rendered normally with the user Navbar, Footer, and a centered container
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow w-full flex items-center justify-center">
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${(pathname === '/login' || pathname === '/admin-login') ? 'pt-0 pb-4 sm:pb-6 md:pb-8' : 'py-4 sm:py-6 md:py-8'}`}>
          {children}
        </div>
      </main>
      {pathname !== '/login' && pathname !== '/admin-login' && <Footer />}
    </div>
  );
}
