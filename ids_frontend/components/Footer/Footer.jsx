"use client";

import React from 'react';
import { Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white mt-auto border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 bg-clip-text text-transparent">Hybrid IDS</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">© {new Date().getFullYear()} Academic Project </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
