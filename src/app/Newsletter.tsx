"use client"
import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';

const Newsletter: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const interestOptions = [
    { value: 'AI', label: t('newsletter.interest.ai') },
    { value: 'Tech', label: t('newsletter.interest.tech') },
    { value: 'CRM', label: t('newsletter.interest.crm') },
    { value: 'Events', label: t('newsletter.interest.events') }
  ];

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: t('newsletter.success') });
        setFormData({ name: '', email: '', interests: [] });
      } else {
        setMessage({ type: 'error', text: data.error || t('newsletter.error') });
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('newsletter.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-purple-700 dark:to-purple-800 rounded-2xl p-8 shadow-xl">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-2 text-center">{t('newsletter.title')}</h3>
        <p className="text-orange-100 dark:text-purple-200 mb-6 text-center">{t('newsletter.subtitle')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t('newsletter.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:border-yellow-400 outline-none transition-all"
            />
            <input
              type="email"
              placeholder={t('newsletter.email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="px-4 py-3 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-transparent focus:border-yellow-400 outline-none transition-all"
            />
          </div>

          <div>
            <label className="text-white font-semibold mb-2 block">{t('newsletter.interests')}</label>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map(option => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInterestToggle(option.value)}
                  className={`px-4 py-2 rounded-full font-semibold transition-all ${
                    formData.interests.includes(option.value)
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '...' : t('newsletter.subscribe')}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/20 border-2 border-green-400 text-green-100' 
              : 'bg-red-500/20 border-2 border-red-400 text-red-100'
          }`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
