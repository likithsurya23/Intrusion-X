"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, Clock, AlertCircle, Bug, Sparkles, Lightbulb, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import { feedbackService } from '@/lib/api/api';
import Alert from '@/components/Alert/Alert';

const CATEGORIES = [
  { id: 'Bug Report', icon: Bug, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-200 dark:border-red-800' },
  { id: 'Feature Request', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-200 dark:border-purple-800' },
  { id: 'General', icon: Lightbulb, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30', border: 'border-blue-200 dark:border-blue-800' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [category, setCategory] = useState('General');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mobileFormOpen, setMobileFormOpen] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    try {
      setFetching(true);
      const data = await feedbackService.getUserFeedback();
      setFeedbacks(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load your feedback history.");
    } finally {
      setFetching(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const fullSubject = `[${category}] ${subject}`;
      await feedbackService.submitFeedback(fullSubject, message);
      setSuccess(true);
      setSubject('');
      setMessage('');
      setCategory('General');
      setMobileFormOpen(false);
      fetchFeedbacks();
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setError("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-8">
      {/* Header - Matching Predict Page Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 dark:from-blue-700 dark:via-violet-700 dark:to-purple-700 p-3.5 sm:p-5 md:p-8 text-white shadow-xl"
      >
        <div className="absolute top-0 right-0 w-48 md:w-64 h-48 md:h-64 bg-white/10 rounded-full -translate-y-24 md:-translate-y-32 translate-x-24 md:translate-x-32" />
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full translate-y-32 md:translate-y-48 -translate-x-32 md:-translate-x-48" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 lg:gap-6">
            <div>
              <div className="flex items-center gap-3 md:gap-4">
                <div className="p-1.5 sm:p-2 md:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                  <MessageSquare className="h-6 w-6 md:h-8 md:w-8" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold">Support & Feedback</h1>
                  <p className="text-blue-100 dark:text-blue-200 text-[10px] sm:text-xs md:text-sm mt-1 flex items-center gap-1 md:gap-2">
                    <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="hidden sm:inline">Submit bug reports, feature requests, or general feedback</span>
                    <span className="sm:hidden">Send feedback to administrators</span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mobile Toggle Button */}
            <button
              onClick={() => setMobileFormOpen(!mobileFormOpen)}
              className="lg:hidden w-full sm:w-auto flex items-center justify-between gap-2 px-3 py-2 sm:px-4 sm:py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-colors"
            >
              <span className="font-medium text-white">
                {mobileFormOpen ? 'Hide Feedback Form' : 'Submit New Feedback'}
              </span>
              {mobileFormOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert type="error" message={error} onClose={() => setError(null)} />
            </motion.div>
          )}
          {success && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Alert type="success" message="Feedback submitted successfully! An administrator will review it shortly." onClose={() => setSuccess(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Submit Form - Desktop always visible, Mobile toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`lg:col-span-1 ${mobileFormOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 md:p-6 shadow-sm lg:sticky lg:top-6">
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-3">Submit New Feedback</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    Category
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`flex flex-col items-center justify-center p-1 sm:p-2.5 rounded-lg border-2 transition-all duration-200 touch-manipulation ${
                          category === cat.id 
                            ? `${cat.border} ${cat.bg} shadow-sm scale-105` 
                            : 'border-transparent bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <cat.icon className={`h-3.5 w-3.5 sm:h-5 sm:w-5 mb-1 ${category === cat.id ? cat.color : 'text-gray-500'}`} />
                        <span className={`text-[9px] sm:text-xs font-medium text-center leading-tight ${category === cat.id ? cat.color : 'text-gray-600 dark:text-gray-400'}`}>
                          {cat.id.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Subject Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="E.g., Cannot export report"
                      className="pl-9 w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white outline-none text-xs sm:text-sm"
                    />
                  </div>
                </div>
 
                {/* Message Textarea */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue or suggestion in detail..."
                    className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:text-white outline-none resize-none text-xs sm:text-sm"
                  />
                </div>
 
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !subject.trim() || !message.trim()}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation text-xs sm:text-sm"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Submit Feedback
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Feedback History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg sm:rounded-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-5 md:p-6 shadow-sm">
              <h2 className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-6">
                Your Feedback History ({feedbacks.length})
              </h2>
              
              {fetching ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : feedbacks.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400 flex flex-col items-center">
                  <MessageSquare className="h-12 w-12 mb-3 opacity-20" />
                  <p>You haven&apos;t submitted any feedback yet.</p>
                  <p className="text-sm mt-2">Use the form above to share your thoughts!</p>
                </div>
              ) : (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="space-y-4"
                >
                  {feedbacks.map((fb) => {
                    let displaySubject = fb.subject;
                    let categoryObj = CATEGORIES[2];
                    
                    const match = fb.subject.match(/^\[(.*?)\] (.*)$/);
                    if (match) {
                      const [, catName, rest] = match;
                      displaySubject = rest;
                      const found = CATEGORIES.find(c => c.id === catName);
                      if (found) categoryObj = found;
                    }

                    return (
                      <motion.div 
                        key={fb.id} 
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        className="bg-gray-50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md"
                      >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-3 mb-2 sm:mb-3">
                          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                            <div className={`flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold ${categoryObj.bg} ${categoryObj.color}`}>
                              <categoryObj.icon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span className="whitespace-nowrap">{categoryObj.id}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 dark:text-white text-[11px] sm:text-base leading-tight flex-1">
                              {displaySubject}
                            </h3>
                          </div>
                          <div className={`shrink-0 flex items-center gap-1 px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium ${fb.is_resolved ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50'}`}>
                            {fb.is_resolved ? <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> : <Clock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                            {fb.is_resolved ? 'Resolved' : 'Pending'}
                          </div>
                        </div>
                        
                        <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 whitespace-pre-wrap break-words">
                          {fb.message}
                        </p>
                        
                        <div className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                          {new Date(fb.created_at).toLocaleString(undefined, { 
                            dateStyle: 'medium', 
                            timeStyle: 'short' 
                          })}
                        </div>
                        
                        <AnimatePresence>
                           {fb.admin_reply && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-3 sm:mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-blue-100 dark:border-blue-800/50 relative overflow-hidden"
                            >
                              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500" />
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <AlertCircle className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                <span className="font-semibold text-[10px] sm:text-sm text-blue-900 dark:text-blue-300">
                                  Response from Admin
                                </span>
                              </div>
                              <p className="text-[11px] sm:text-sm text-blue-950 dark:text-blue-100 whitespace-pre-wrap leading-relaxed break-words">
                                {fb.admin_reply}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
    </div>
  );
}