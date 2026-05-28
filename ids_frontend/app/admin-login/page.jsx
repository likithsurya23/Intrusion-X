"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, User, LogIn, ArrowRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [username, setUsername] = useState('likithsurya555@gmail.com');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (username.toLowerCase() !== 'likithsurya555@gmail.com') {
        throw new Error('Unauthorized: Only likithsurya555@gmail.com is permitted to access the Admin Portal.');
      }
      await login(username, password, true);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Background decorations - Responsive blur effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md h-[300px] sm:h-[400px] bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-red-600/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[20rem] sm:max-w-md space-y-4 sm:space-y-6 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-red-200 dark:border-red-900/50 shadow-xl dark:shadow-2xl relative z-10 transition-colors duration-300"
      >
        {/* Header Section */}
        <div className="text-center space-y-2 sm:space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto h-10 w-10 sm:h-14 sm:w-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
          >
            <Shield className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
          </motion.div>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white transition-colors">
            Administrator Portal
          </h2>
          <p className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400 transition-colors">
            Authorized Personnel Only
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-2 sm:p-4 rounded-md transition-colors"
            >
              <p className="text-[10px] sm:text-xs text-red-600 dark:text-red-400 break-words">{error}</p>
            </motion.div>
          )}
          
          <div className="space-y-3 sm:space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 transition-colors">
                Admin Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <User className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-red-500 dark:group-focus-within:text-red-400 transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-8 sm:pl-10 pr-3 py-1.5 sm:py-3 w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900 dark:text-white outline-none text-xs sm:text-sm placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="Admin Email Address"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[10px] sm:text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2 transition-colors">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                  <Lock className="h-3.5 w-3.5 sm:h-5 sm:w-5 text-gray-400 dark:text-gray-500 group-focus-within:text-red-500 dark:group-focus-within:text-red-400 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 sm:pl-10 pr-3 py-1.5 sm:py-3 w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-gray-900 dark:text-white outline-none text-xs sm:text-sm placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center items-center gap-2 py-2 sm:py-2.5 px-3 border border-transparent text-xs sm:text-sm font-bold rounded-lg text-white bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            <LogIn className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
            {isLoading ? 'Authenticating...' : 'Sign In as Admin'}
            {!isLoading && (
              <ArrowRight className="h-3.5 w-3.5 sm:h-5 sm:w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            )}
          </motion.button>
        </form>
        
        {/* Sidebar Style Button */}
        <div className="pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-800">
          <Link href="/login" className="block">
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg bg-gray-100 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-red-600/20 to-orange-600/20 group-hover:from-red-600/30 group-hover:to-orange-600/30 transition-colors">
                <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-400 group-hover:text-red-300 transition-colors" />
              </div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  User Access
                </p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}