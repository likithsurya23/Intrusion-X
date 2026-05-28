"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Shield, MessageSquare, LogIn, LayoutDashboard, Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth';

export default function AdminLayout({ children }) {
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && isAuthenticated && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, isAuthenticated, loading, router]);

  if (loading || (!isAuthenticated && isAdmin === false)) return null;

  const navItems = [
    { name: 'Login Details', href: '/admin', icon: LogIn },
    { name: 'Feedback', href: '/admin/feedback', icon: MessageSquare },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 min-h-[calc(100vh-8rem)] relative">
      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 p-4 -mx-4 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-20">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-indigo-500" />
          <span className="font-bold text-gray-900 dark:text-white">Admin Panel</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? <X className="h-5 w-5 text-gray-700 dark:text-white" /> : <Menu className="h-5 w-5 text-gray-700 dark:text-white" />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      <div className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-55 transition-opacity duration-300 md:hidden
        ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setIsSidebarOpen(false)} />

      {/* Sidebar - Drawer on mobile, Fixed on desktop */}
      <div className={`
        fixed top-0 bottom-0 left-0 w-64 bg-white dark:bg-gray-800 z-60 transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:z-auto md:w-64 shrink-0 flex flex-col gap-2 md:rounded-2xl border-r md:border border-gray-200 dark:border-gray-700 md:shadow-sm p-4
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="flex items-center gap-3 px-3 py-2 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4">
          <Shield className="h-6 w-6 text-indigo-500 shrink-0" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white truncate">Admin Panel</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden ml-auto p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 pb-10">
        {children}
      </div>
    </div>
  );
}
