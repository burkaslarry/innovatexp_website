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
    } catch {
      setMessage({ type: 'error', text: t('newsletter.error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl bg-gradient-to-r from-brand-primary to-brand-primary-hover p-8 shadow-xl dark:from-[#00B9B3] dark:to-[#009e98]">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-white mb-2 text-center">{t('newsletter.title')}</h3>
        <p className="mb-6 text-center text-white/90">{t('newsletter.subtitle')}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder={t('newsletter.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="rounded-lg border-2 border-transparent bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-white focus:ring-2 focus:ring-white/40 dark:bg-slate-800 dark:text-white dark:focus:border-teal-300 dark:focus:ring-teal-400/30"
            />
            <input
              type="email"
              placeholder={t('newsletter.email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="rounded-lg border-2 border-transparent bg-white px-4 py-3 text-gray-900 outline-none transition-all focus:border-white focus:ring-2 focus:ring-white/40 dark:bg-slate-800 dark:text-white dark:focus:border-teal-300 dark:focus:ring-teal-400/30"
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
                  className={`rounded-full px-4 py-2 font-semibold transition-all ${
                    formData.interests.includes(option.value)
                      ? "bg-white text-brand-primary shadow-sm dark:bg-slate-950 dark:text-teal-300"
                      : "bg-white/20 text-white hover:bg-white/30"
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
            className="w-full rounded-lg bg-white py-3 px-6 font-bold text-brand-primary shadow-md transition-all hover:scale-[1.02] hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-950 dark:text-teal-300 dark:hover:bg-slate-900"
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
