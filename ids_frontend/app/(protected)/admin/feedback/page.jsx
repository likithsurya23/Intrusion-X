"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Mail, 
  ShieldAlert, 
  CornerDownRight, 
  Bug, 
  Sparkles, 
  Lightbulb,
  Search,
  X,
  Filter,
  ChevronDown,
  ChevronUp,
  Reply,
  Star,
  Flag,
  MoreVertical,
  Eye,
  UserCheck,
  Calendar,
  Download,
  RefreshCw
} from 'lucide-react';
import { feedbackService } from '@/lib/api/api';
import Alert from '@/components/Alert/Alert';
import { useAuth } from '@/lib/auth/auth';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { id: 'Bug Report', icon: Bug, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800' },
  { id: 'Feature Request', icon: Sparkles, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800' },
  { id: 'General', icon: Lightbulb, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800' }
];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'pending', label: 'Pending First' },
  { value: 'resolved', label: 'Resolved First' }
];

export default function AdminFeedbackPage() {
  const { isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  
  // State Management
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // UI State
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [expandedCards, setExpandedCards] = useState(new Set());

  // Authentication Check
  useEffect(() => {
    if (!authLoading && !isAdmin) {
      router.push('/dashboard');
    }
  }, [isAdmin, authLoading, router]);

  // Fetch Feedbacks
  useEffect(() => {
    if (isAdmin) {
      fetchFeedbacks();
    }
  }, [isAdmin]);

  // Filtering and Sorting
  useEffect(() => {
    let results = [...feedbacks];

    // Apply status filter
    if (filter === 'pending') {
      results = results.filter(fb => !fb.is_resolved);
    } else if (filter === 'resolved') {
      results = results.filter(fb => fb.is_resolved);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(fb => 
        fb.username.toLowerCase().includes(query) ||
        fb.user_email.toLowerCase().includes(query) ||
        fb.subject.toLowerCase().includes(query) ||
        fb.message.toLowerCase().includes(query) ||
        (fb.admin_reply && fb.admin_reply.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    results.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at);
        case 'oldest':
          return new Date(a.created_at) - new Date(b.created_at);
        case 'pending':
          return (a.is_resolved === b.is_resolved) ? 0 : a.is_resolved ? 1 : -1;
        case 'resolved':
          return (a.is_resolved === b.is_resolved) ? 0 : a.is_resolved ? -1 : 1;
        default:
          return 0;
      }
    });

    setFilteredFeedbacks(results);
  }, [feedbacks, filter, searchQuery, sortBy]);

  async function fetchFeedbacks(showRefresh = false) {
    try {
      if (showRefresh) setIsRefreshing(true);
      setFetching(true);
      const data = await feedbackService.getAdminFeedback();
      setFeedbacks(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load user feedback. Please try again.");
    } finally {
      setFetching(false);
      setIsRefreshing(false);
    }
  }

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
      const feedback = feedbacks.find(f => f.id === id);
      await feedbackService.replyToFeedback(id, feedback.admin_reply || '', !currentStatus);
      setFeedbacks(feedbacks.map(fb => 
        fb.id === id ? { ...fb, is_resolved: !currentStatus } : fb
      ));
    } catch (err) {
      console.error(err);
      setError("Failed to update status.");
    }
  };

  const handleExport = () => {
    const csv = generateCSV(filteredFeedbacks);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateCSV = (data) => {
    const headers = ['Username', 'Email', 'Category', 'Subject', 'Message', 'Status', 'Admin Reply', 'Created At'];
    const rows = data.map(fb => {
      const match = fb.subject.match(/^\[(.*?)\] (.*)$/);
      const category = match ? match[1] : 'General';
      const subject = match ? match[2] : fb.subject;
      
      return [
        fb.username,
        fb.user_email,
        category,
        subject,
        fb.message,
        fb.is_resolved ? 'Resolved' : 'Pending',
        fb.admin_reply || '',
        new Date(fb.created_at).toLocaleString()
      ];
    });
    return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  };

  const getCategoryFromSubject = (subject) => {
    const match = subject?.match(/^\[(.*?)\] (.*)$/);
    if (match) {
      const found = CATEGORIES.find(c => c.id === match[1]);
      if (found) return { category: found, displaySubject: match[2] };
    }
    return { category: CATEGORIES[2], displaySubject: subject || 'No Subject' };
  };

  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const getStats = () => ({
    total: feedbacks.length,
    pending: feedbacks.filter(f => !f.is_resolved).length,
    resolved: feedbacks.filter(f => f.is_resolved).length,
    withReplies: feedbacks.filter(f => f.admin_reply).length
  });

  const stats = getStats();

  if (authLoading || !isAdmin) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3">
            <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />
            Feedback Management
          </h1>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => fetchFeedbacks(true)}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              filter === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              filter === 'pending'
                ? 'bg-amber-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Pending ({stats.pending})
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              filter === 'resolved'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            Resolved ({stats.resolved})
          </button>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 sm:pl-9 pr-4 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              >
                <X className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SORT_OPTIONS.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <Alert type="error" message={error} onClose={() => setError(null)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {fetching ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-3" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No feedback found</p>
            {(filter !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredFeedbacks.map((fb) => {
              const { category, displaySubject } = getCategoryFromSubject(fb.subject);
              const isExpanded = expandedCards.has(fb.id);
              
              return (
                <motion.div
                  key={fb.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  {/* Feedback Header (Always Visible) */}
                  <div className="p-3.5 sm:p-5 md:p-6 cursor-pointer" onClick={() => toggleExpand(fb.id)}>
                    <div className="flex flex-col lg:flex-row lg:items-start gap-3 sm:gap-4">
                      {/* Left Section - User Info */}
                      <div className="lg:w-64 shrink-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                            {fb.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{fb.username}</p>
                            <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[150px]">{fb.user_email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-1 sm:mt-2">
                          <Calendar className="h-3 w-3" />
                          {new Date(fb.created_at).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Right Section - Content Preview */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                          <div className={`flex items-center gap-1.5 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${category.bg} ${category.color}`}>
                            <category.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            {category.id}
                          </div>
                          <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${
                            fb.is_resolved 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          }`}>
                            {fb.is_resolved ? <CheckCircle2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />}
                            {fb.is_resolved ? 'Resolved' : 'Pending'}
                          </div>
                          {fb.admin_reply && (
                            <div className="inline-flex items-center gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                              <Reply className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              Replied
                            </div>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                          {displaySubject}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {fb.message}
                        </p>
                      </div>

                      {/* Expand Icon */}
                      <div className="shrink-0">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-2 sm:px-6 sm:pb-6 border-t border-gray-100 dark:border-gray-700">
                          <div className="ml-0 lg:ml-64">
                            {/* Full Message */}
                            <div className="mb-4 sm:mb-6">
                              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">Message</h4>
                              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 sm:p-4">
                                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                  {fb.message}
                                </p>
                              </div>
                            </div>

                            {/* Admin Reply Section */}
                            {fb.admin_reply ? (
                              <div className="mb-4 sm:mb-6">
                                <h4 className="text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-400 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                                  <ShieldAlert className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                  Admin Response
                                </h4>
                                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 sm:p-4 border-l-4 border-indigo-500">
                                  <p className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 whitespace-pre-wrap">
                                    {fb.admin_reply}
                                  </p>
                                  <button
                                    onClick={() => {
                                      setReplyingTo(fb.id);
                                      setReplyText(fb.admin_reply);
                                    }}
                                    className="mt-2.5 text-[10px] sm:text-xs text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium"
                                  >
                                    Edit Reply
                                  </button>
                                </div>
                              </div>
                            ) : replyingTo !== fb.id && (
                              <button
                                onClick={() => setReplyingTo(fb.id)}
                                className="mb-4 sm:mb-6 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
                              >
                                <Reply className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                Reply to Feedback
                              </button>
                            )}

                            {/* Reply Form */}
                            {replyingTo === fb.id && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-4 sm:mb-6"
                              >
                                <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                                  Write your response
                                </h4>
                                <textarea
                                  rows={5}
                                  value={replyText}
                                  onChange={(e) => setReplyText(e.target.value)}
                                  placeholder="Type your response to the user..."
                                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all dark:text-white outline-none resize-none"
                                  autoFocus
                                />
                                <div className="flex justify-end gap-1.5 sm:gap-2 mt-2.5 sm:mt-3">
                                  <button
                                    onClick={() => {
                                      setReplyingTo(null);
                                      setReplyText('');
                                    }}
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    onClick={() => handleReply(fb.id)}
                                    disabled={submittingReply || !replyText.trim()}
                                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 sm:gap-2"
                                  >
                                    {submittingReply ? (
                                      <>
                                        <div className="animate-spin rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                                        Sending...
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                        Send Reply & Resolve
                                      </>
                                    )}
                                  </button>
                                </div>
                              </motion.div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-3 sm:gap-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                              <button
                                onClick={() => toggleResolveStatus(fb.id, fb.is_resolved)}
                                className={`px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-medium rounded-lg transition-colors ${
                                  fb.is_resolved
                                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    : 'text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20'
                                }`}
                              >
                                {fb.is_resolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}