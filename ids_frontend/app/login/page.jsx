"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, LogIn, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      if (email.toLowerCase() === 'likithsurya555@gmail.com' || username.toLowerCase() === 'likithsurya555@gmail.com') {
        throw new Error('Administrators must log in via the Administrator Access portal below.');
      }

      if (!isLogin) {
        await register(name, email, password);
      } else {
        await login(username || 'user', password);
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations - Responsive blur effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-[400px] bg-gradient-to-r from-blue-500/20 to-violet-500/20 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[22rem] sm:max-w-sm space-y-4 sm:space-y-5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl border border-blue-200 dark:border-blue-900/50 shadow-xl dark:shadow-2xl relative z-10 my-4 sm:my-8 transition-colors duration-300"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg mb-3"
          >
            <Shield className="h-6 w-6 text-white" />
          </motion.div>
          <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-1 transition-colors">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">
            Sign in to access real-time network predictions.
          </p>
        </div>

        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-2 rounded-md transition-colors">
              <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}
          <div className="space-y-2 sm:space-y-3">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      required={!isLogin}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-8 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors" />
                    </div>
                    <input
                      type="email"
                      required={!isLogin}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-8 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </>
            )}

            {isLogin && (
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Username / Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required={isLogin}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-8 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Username or Email"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 transition-colors">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400 dark:text-gray-500 transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-8 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 dark:text-white outline-none text-sm placeholder-gray-400 dark:placeholder-gray-500"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" type="checkbox" className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded transition-colors" />
                <label htmlFor="remember-me" className="ml-1.5 block text-xs text-gray-500 dark:text-gray-400 transition-colors">Remember me</label>
              </div>
              <div className="text-xs">
                <a href="#" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">Forgot password?</a>
              </div>
            </div>
          )}

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className="group relative w-full flex justify-center py-2 px-3 border border-transparent text-xs font-bold rounded-lg text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-2">
              <LogIn className="h-4 w-4 text-blue-300 group-hover:text-blue-200 transition-colors" />
            </span>
            {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            {!isLoading && <ArrowRight className="ml-1 h-4 w-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-1 transition-all duration-300" />}
          </motion.button>
        </form>

        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 transition-colors">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-blue-500 hover:text-blue-400 transition-colors"
            >
              {isLogin ? 'Sign up now' : 'Sign in instead'}
            </button>
          </p>
          
        {/* Sidebar Style Button */}
        <div className="pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-800 transition-colors mt-4">
          <Link href="/admin-login" className="block">
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-4 py-2.5 sm:py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-500/50 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-600/20 dark:to-orange-600/20 group-hover:from-red-200 group-hover:to-orange-200 dark:group-hover:from-red-600/30 dark:group-hover:to-orange-600/30 transition-colors">
                <Shield className="h-4 w-4 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-300 group-hover:text-red-700 dark:group-hover:text-white transition-colors">
                  Administrator Access
                </p>
                <p className="text-xs text-gray-500 group-hover:text-red-600/70 dark:group-hover:text-gray-400 transition-colors">
                  Authorized personnel only
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-1 transition-all duration-300" />
            </motion.div>
          </Link>
        </div>
        </div>
      </motion.div>
    </div>
  );
}