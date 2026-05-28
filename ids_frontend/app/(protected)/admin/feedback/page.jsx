"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, CheckCircle2, Clock, Mail, ShieldAlert, CornerDownRight, Bug, Sparkles, Lightbulb } from 'lucide-react';
import { feedbackService } from '@/lib/api/api';
import Alert from '@/components/Alert/Alert';
import { useAuth } from '@/lib/auth/auth';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'Bug Report', icon: Bug, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30' },
  { id: 'Feature Request', icon: Sparkles, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { id: 'General', icon: Lightbulb, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' }
];

export default function AdminFeedbackPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'resolved'

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, authLoading, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchFeedbacks();
    }
  }, [isAdmin]);

  const fetchFeedbacks = async () => {
    try {
      setFetching(true);
      const data = await feedbackService.getAdminFeedback();
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load user feedback.");
    } finally {
      setFetching(false);
    }
  };

  const handleReply = async (id) => {
    if (!replyText.trim()) return;

    try {
      setSubmittingReply(true);
      setError(null);
      await feedbackService.replyToFeedback(id, replyText, true);
      
      // Update local state
      setFeedbacks(feedbacks.map(fb => 
        fb.id === id ? { ...fb, admin_reply: replyText, is_resolved: true } : fb
      ));
      
      setReplyingTo(null);
      setReplyText('');
    } catch (err) {
      console.error(err);
      setError("Failed to submit reply. Please try again.");
    } finally {
      setSubmittingReply(false);
    }
  };

  const toggleResolveStatus = async (id, currentStatus) => {
    try {
      await feedbackService.replyToFeedback(id, feedbacks.find(f => f.id === id).admin_reply, !currentStatus);
      setFeedbacks(feedbacks.map(fb => 
        fb.id === id ? { ...fb, is_resolved: !currentStatus } : fb
      ));
    } catch (err) {
      console.error(err);
      setError("Failed to update status.");
    }
  };

  if (authLoading || !isAdmin) return null;

  const filteredFeedbacks = feedbacks.filter(fb => {
    if (filter === 'pending') return !fb.is_resolved;
    if (filter === 'resolved') return fb.is_resolved;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-indigo-500" />
            Manage Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Review and respond to user submissions, bug reports, and suggestions.</p>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-wrap gap-2 bg-gray-50 dark:bg-gray-800/30">
          <button 
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            All Feedback ({feedbacks.length})
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filter === 'pending' ? 'bg-white dark:bg-gray-700 shadow text-amber-700 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <Clock className="h-4 w-4" /> Pending ({feedbacks.filter(f => !f.is_resolved).length})
          </button>
          <button 
            onClick={() => setFilter('resolved')}
            className={`flex-1 sm:flex-none justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${filter === 'resolved' ? 'bg-white dark:bg-gray-700 shadow text-emerald-700 dark:text-emerald-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
          >
            <CheckCircle2 className="h-4 w-4" /> Resolved ({feedbacks.filter(f => f.is_resolved).length})
          </button>
        </div>

        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400 flex flex-col items-center">
            <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
            <p>No feedback found matching the current filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {filteredFeedbacks.map((fb) => {
              // Parse category from subject
              let displaySubject = fb.subject;
              let categoryObj = CATEGORIES[2]; // Default to General
              
              const match = fb.subject.match(/^\[(.*?)\] (.*)$/);
              if (match) {
                const [, catName, rest] = match;
                displaySubject = rest;
                const found = CATEGORIES.find(c => c.id === catName);
                if (found) categoryObj = found;
              }

              return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                key={fb.id} 
                className="p-6 transition-colors dark:hover:bg-gray-800/40"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column: User Info */}
                  <div className="lg:w-1/4 shrink-0 border-r-0 lg:border-r border-gray-200 dark:border-gray-800 pr-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                        {fb.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {fb.username}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2 truncate">
                      <Mail className="h-3 w-3 shrink-0" /> {fb.user_email}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-4">
                      <Clock className="h-3 w-3 shrink-0" /> {new Date(fb.created_at).toLocaleString()}
                    </div>
                    
                    <button 
                      onClick={() => toggleResolveStatus(fb.id, fb.is_resolved)}
                      className={`w-full py-1.5 px-3 rounded text-xs font-medium border transition-colors ${fb.is_resolved 
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400' 
                        : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'}`}
                    >
                      {fb.is_resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                    </button>
                  </div>

                  {/* Right Column: Message & Reply */}
                  <div className="lg:w-3/4 flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${categoryObj.bg} ${categoryObj.color}`}>
                          <categoryObj.icon className="h-3 w-3" />
                          {categoryObj.id}
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg leading-tight">{displaySubject}</h3>
                      </div>
                      <div className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${fb.is_resolved ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                        {fb.is_resolved ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                        {fb.is_resolved ? 'Resolved' : 'Pending'}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 whitespace-pre-wrap mt-2">{fb.message}</p>

                    {fb.admin_reply ? (
                      <div className="bg-indigo-50 dark:bg-indigo-900/10 rounded-xl p-4 border border-indigo-100 dark:border-indigo-900/30 relative">
                        <CornerDownRight className="absolute -top-3 -left-3 h-6 w-6 text-indigo-300 dark:text-indigo-700 bg-white dark:bg-gray-900 rounded-full" />
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-2">
                            <ShieldAlert className="h-4 w-4" /> Admin Response
                          </span>
                          <button 
                            onClick={() => {
                              setReplyingTo(fb.id);
                              setReplyText(fb.admin_reply);
                            }}
                            className="text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline"
                          >
                            Edit Reply
                          </button>
                        </div>
                        <p className="text-sm text-indigo-950 dark:text-indigo-200 whitespace-pre-wrap">{fb.admin_reply}</p>
                      </div>
                    ) : (
                      replyingTo !== fb.id && (
                        <button 
                          onClick={() => setReplyingTo(fb.id)}
                          className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:hover:bg-indigo-900/40 px-4 py-2 rounded-lg transition-colors"
                        >
                          <CornerDownRight className="h-4 w-4" /> Write a Reply
                        </button>
                      )
                    )}

                    {replyingTo === fb.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }} 
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4"
                      >
                        <textarea
                          rows={4}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Type your response to the user..."
                          className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-indigo-300 dark:border-indigo-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white outline-none resize-none mb-3 shadow-inner"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText('');
                            }}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleReply(fb.id)}
                            disabled={submittingReply || !replyText.trim()}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                          >
                            {submittingReply ? 'Sending...' : 'Send Reply & Resolve'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )})}
          </div>
        )}
      </div>
    </div>
  );
}
