"use client";

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function MetricCard({ 
  title, 
  value, 
  description, 
  trend = 0,
  icon: Icon,
  color = 'primary' 
}) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
    danger: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  };

  const getTrendIcon = () => {
    if (trend > 0) return <TrendingUp className="h-4 w-4" />;
    if (trend < 0) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  return (
    <div className={`card border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-end gap-2 mt-2">
            <h3 className="text-3xl font-bold">{value}%</h3>
            {trend !== 0 && (
              <div className={`flex items-center gap-1 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {getTrendIcon()}
                <span>{Math.abs(trend)}%</span>
              </div>
            )}
          </div>
        </div>
        {Icon && (
          <div className={`p-3 rounded-full ${colorClasses[color].split(' ')[0]}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mt-4">{description}</p>
      )}
    </div>
  );
}