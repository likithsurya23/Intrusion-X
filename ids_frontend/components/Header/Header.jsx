"use client";

// Header.jsx
import React from 'react';
import Navbar from './Navbar'; // Adjust import path
import { useTheme } from './theme'; // Import useTheme
import { Moon, Sun } from 'lucide-react'; // Import icons

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50">
      <Navbar />
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end">
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            {isDarkMode ? (
              <>
                <Sun className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Light Mode
                </span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  Dark Mode
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;