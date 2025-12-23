'use client';

import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  onClose: () => void;
  autoCloseDuration?: number;
}

export default function Modal({
  isOpen,
  type,
  title,
  message,
  onClose,
  autoCloseDuration = 5000,
}: ModalProps) {
  useEffect(() => {
    if (isOpen && autoCloseDuration) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoCloseDuration, onClose]);

  if (!isOpen) return null;

  const isSuccess = type === 'success';
  const bgColor = isSuccess ? 'bg-emerald-900/95' : 'bg-red-900/95';
  const borderColor = isSuccess ? 'border-emerald-500' : 'border-red-500';
  const textColor = isSuccess ? 'text-emerald-100' : 'text-red-100';
  const titleColor = isSuccess ? 'text-emerald-200' : 'text-red-200';
  const buttonColor = isSuccess
    ? 'bg-emerald-600 hover:bg-emerald-700'
    : 'bg-red-600 hover:bg-red-700';
  const iconPath = isSuccess
    ? 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
    : 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`${bgColor} border-2 ${borderColor} rounded-xl shadow-2xl max-w-md w-full transform transition-all`}>
        <div className="p-6">
          <div className="flex items-start">
            <svg className="w-8 h-8 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d={iconPath} clipRule="evenodd" />
            </svg>
            <div className="ml-4 flex-1">
              <h3 className={`${titleColor} text-lg font-bold mb-2`}>{title}</h3>
              <p className={`${textColor} leading-relaxed`}>{message}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 ml-4 flex-shrink-0"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className={`flex-1 ${buttonColor} text-white font-semibold py-2 px-4 rounded-lg transition-colors`}
            >
              {isSuccess ? '確認' : '關閉'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
