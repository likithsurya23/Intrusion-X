"use client";

import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

const Alert = ({ type = 'info', title, message, onClose }) => {
  const config = {
    info: {
      icon: Info,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      iconColor: 'text-blue-400',
    },
    success: {
      icon: CheckCircle,
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-400',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-400',
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-400',
    },
  };

  const { icon: Icon, bg, border, text, iconColor } = config[type];

  return (
    <div className={`${bg} border-l-4 ${border} p-4 rounded-r-lg`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="ml-3">
          {title && <h3 className={`text-sm font-medium ${text}`}>{title}</h3>}
          <div className={`text-sm ${text}`}>
            <p>{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 text-gray-400 hover:text-gray-800"
          >
            <span className="sr-only">Close</span>
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;