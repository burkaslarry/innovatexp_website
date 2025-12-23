'use client';

import { useEffect } from 'react';

interface ToastProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDuration?: number;
}

export default function Toast({
  isOpen,
  type,
  title,
  message,
  onClose,
  autoCloseDuration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (isOpen && autoCloseDuration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess
    ? 'bg-emerald-900/95'
    : 'bg-red-900/95';
  const borderColor = isSuccess
    ? 'border-emerald-500'
    : 'border-red-500';
  const titleColor = isSuccess
    ? 'text-emerald-200'
    : 'text-red-200';
  const textColor = isSuccess
    ? 'text-emerald-100'
    : 'text-red-100';

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`${bgColor} border-2 ${borderColor} rounded-xl shadow-2xl p-4 max-w-sm w-full`}
      >
        <div className="flex items-start gap-3">
          {isSuccess ? (
            <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <div className="flex-1">
            <h3 className={`font-bold text-sm ${titleColor} mb-1`}>{title}</h3>
            <p className={`text-sm ${textColor} leading-relaxed`}>{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 flex-shrink-0 ml-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
