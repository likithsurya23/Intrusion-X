"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from '@/lib/context/ThemeContext';
import { useAuth } from '@/lib/auth/auth';
import {
  Shield, Menu, X, Home, BarChart3, Target, Database,
  PieChart, Brain, ChevronRight, Activity, Moon, Sun,
  LogIn, LogOut, Settings, MessageSquare
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Dashboard', path: '/dashboard', icon: Activity, protected: true },
    { name: 'Single Prediction', path: '/predict', icon: Target, protected: true },
    { name: 'Batch Prediction', path: '/batch', icon: Database, protected: true },
    { name: 'Analytics', path: '/analytics', icon: PieChart, protected: true },
    { name: 'Feedback', path: '/feedback', icon: MessageSquare, protected: true },
    { name: 'About', path: '/about', icon: BarChart3, protected: true },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: Settings, protected: true });
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (path) => {
    if (path === '/') return pathname === path;
    return pathname?.startsWith(path);
  };

  const visibleNavItems = navItems.filter(item => {
    if (isAuthenticated && item.name === 'Home') return false;
    return !item.protected || isAuthenticated;
  });

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50'
        : 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                  <div className="relative p-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    Hybrid IDS
                  </span>
                </div>
              </Link>
            </div>

            {/* Right side - Desktop Controls */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
              </button>

              {isAuthenticated && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{user.role}</div>
                  </div>
                  <button onClick={logout} className="p-2 rounded-xl text-danger-600 hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              )}

              <div className="relative">
                <button
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group relative"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isDarkMode ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />}
              </button>
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Slide-in Menu */}
      {isOpen && (
        <div className="hidden lg:block">
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-80" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-gray-900 shadow-2xl z-90 transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              <div className="p-8 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <div className="font-bold text-xl text-gray-900 dark:text-white">Menu</div>
                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {visibleNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group ${active ? 'bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/30 dark:to-violet-900/30 border-2 border-blue-200 dark:border-blue-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border-2 border-transparent'}`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl ${active ? 'bg-gradient-to-r from-blue-500 to-violet-500 text-white shadow-lg' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`font-semibold ${active ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>{item.name}</span>
                      </div>
                      <ChevronRight className={`h-4 w-4 ${active ? 'text-blue-500' : 'text-gray-400'}`} />
                    </Link>
                  );
                })}
                {!isAuthenticated ? (
                  <Link href="/login" onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-200 group border-2 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800`}>
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                        <LogIn className="h-5 w-5" />
                      </div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Sign In</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-80" onClick={() => setIsOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl z-90 transform transition-transform duration-300 ease-out flex flex-col h-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
              <div className="font-bold text-lg dark:text-white">Hybrid IDS</div>
              <button onClick={() => setIsOpen(false)} className="p-2"><X className="h-5 w-5 dark:text-white" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link key={item.name} href={item.path} onClick={() => setIsOpen(false)} className={`flex items-center justify-between p-4 rounded-xl ${active ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    <div className="flex items-center space-x-3">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                );
              })}
              {!isAuthenticated ? (
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center space-x-3 p-4 rounded-xl text-blue-600 font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              ) : (
                <button onClick={() => { logout(); setIsOpen(false); }} className="w-full flex items-center space-x-3 p-4 rounded-xl text-danger-600 font-medium">
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;
