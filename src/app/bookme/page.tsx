// app/bookme/page.tsx
'use client';

import { useState, useEffect, FormEvent, useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, startOfDay } from 'date-fns';
import { zhTW, enUS } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '../LanguageContext';
import Modal from '../Modal';
import WhatsAppModal from '../WhatsAppModal';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeToggle from '../ThemeToggle';

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

export default function BookVisitPage() {
  const { t, language } = useLanguage();
  const router = useRouter();
  
  // Initialize with current date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const today = new Date();
    // Set time to midnight to ensure proper date comparison
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorCompany, setVisitorCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [showGuidelines, setShowGuidelines] = useState(false);

  // Get available slots function
  const GetAvailableSlots = useCallback(async () => {
    if (!selectedDate) {
      setAvailableSlots([]);
      return;
    }

    setIsFetchingSlots(true);
    setError(null);
    setSelectedTimeSlot(null);

    try {
      const formattedDate = format(selectedDate!, 'yyyy-MM-dd');
      const response = await fetch(`/api/calendar/slots?date=${formattedDate}`);
      if (!response.ok) {
        throw new Error('無法獲取可用時段');
      }
      const data = await response.json();
      setAvailableSlots(data.slots || []);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '獲取時段失敗';
      setError(errorMessage);
      setAvailableSlots([]);
    } finally {
      setIsFetchingSlots(false);
    }
  }, [selectedDate]);

  // Fetch available slots when date changes
  useEffect(() => {
    GetAvailableSlots();
  }, [selectedDate, GetAvailableSlots]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!selectedDate || !selectedTimeSlot || !visitorName || !visitorEmail) {
      setError(t('bookme.error.title'));
      setIsLoading(false);
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)) {
      setError(t('bookme.error.email'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/calendar/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitorName,
          visitorEmail,
          visitorPhone,
          visitorCompany,
          selectedDate: format(selectedDate, 'yyyy-MM-dd'),
          selectedTimeSlot,
          message,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || t('bookme.error.booking'));
      }

      const result = await response.json();
      
      console.log('📥 Booking response:', result);
      console.log('   notionSuccess:', result.notionSuccess);
      console.log('   whatsappMessage:', result.whatsappMessage ? 'exists' : 'null');
      
      // Check if Notion was successful
      if (result.notionSuccess && result.whatsappMessage) {
        console.log('✅ Showing WhatsApp prompt');
        // Show WhatsApp prompt
        const whatsappLink = `https://wa.me/85293103031?text=${result.whatsappMessage}`;
        setWhatsappUrl(whatsappLink);
        setShowWhatsAppPrompt(true);
        setSuccessMessage(t('bookme.success.title'));
        // Refresh the page after success modal closes
        setTimeout(() => window.location.reload(), 5100);

        // Reload available slots for the selected date to reflect the booking
      } else {
        console.warn('⚠️ Not showing WhatsApp prompt');
        console.warn('   notionSuccess:', result.notionSuccess);
        console.warn('   whatsappMessage:', result.whatsappMessage ? 'exists' : 'null');
        // Still show success even if Notion failed
        setSuccessMessage(t('bookme.success.subtitle'));
        // Refresh the page after success modal closes
        setTimeout(() => window.location.reload(), 5100);
      }

      // Reset form
      setSelectedDate(new Date());
      setSelectedTimeSlot(null);      
      console.warn('🔄 available slots:' , availableSlots);
      setVisitorName('');
      setVisitorEmail('');
      setVisitorPhone('');
      setVisitorCompany('');
      setMessage('');
      // Note: Don't reset availableSlots here since we reload them above for successful bookings
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '預約失敗';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Disable past dates and weekends
  const disabledDays = (date: Date) => {
    const today = startOfDay(new Date());
    const dateToCheck = startOfDay(date);
    // Disable past dates (before today)
    if (dateToCheck < today) {
      return true;
    }
    // Disable weekends (0 = Sunday, 6 = Saturday)
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // Mobile-first input styling with proper touch targets and keyboard optimization
  const inputClassName = "w-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg py-4 px-5 text-gray-900 dark:text-white text-base placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-400/30 transition-all duration-200 min-h-[54px]";

  return (
    <div className="min-h-screen bg-[#fffcf7] dark:bg-gray-900" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Sticky Header with Glassmorphism */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-700" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="mx-auto py-4 px-6 flex items-center justify-between max-w-7xl">
          {/* Back Button - Mobile First */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors active:scale-95"
            aria-label="Back to home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Logo & Title */}
          <div className="flex items-center gap-3 flex-1 mx-4">
            <Image
              src="/innovatexp_black.svg"
              alt="InnovateXP"
              width={40}
              height={40}
              className="dark:invert"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">{t('bookme.header.title')}</h1>
            </div>
          </div>

          {/* Compact Controls */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Compact Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>
            {/* Mobile: Globe Icon Only */}
            <div className="sm:hidden">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto py-6 px-6 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section - Compact */}
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              📅 {t('bookme.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              {t('bookme.subtitle')}
            </p>
          </div>

          {/* Collapsible Guidelines - Mobile Optimized */}
          <div className="mb-6">
            <button
              onClick={() => setShowGuidelines(!showGuidelines)}
              className="w-full flex items-center justify-between bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl px-5 py-4 text-left hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors active:scale-[0.99]"
              aria-expanded={showGuidelines}
            >
              <span className="flex items-center gap-2 text-orange-900 dark:text-orange-300 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('bookme.info.title')}</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 text-orange-700 dark:text-orange-400 transition-transform ${showGuidelines ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showGuidelines && (
              <div className="mt-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 animate-fadeIn">
                <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{t('bookme.info.monday_friday')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{t('bookme.info.one_hour')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{t('bookme.info.confirmation')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{t('bookme.info.cancel')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>{t('bookme.info.online')}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">

            {/* Success Modal */}
            <Modal
              isOpen={successMessage !== null}
              type={successMessage && successMessage.includes('未能預約成功') ? 'error' : 'success'}
              title={successMessage && successMessage.includes('未能預約成功') ? t('bookme.modal.error.title') : t('bookme.modal.success.title')}
              message={successMessage || ''}
              onClose={() => setSuccessMessage(null)}
              autoCloseDuration={5000}
            />

            {/* WhatsApp Modal */}
            <WhatsAppModal
              isOpen={showWhatsAppPrompt}
              onClose={() => setShowWhatsAppPrompt(false)}
              whatsappUrl={whatsappUrl}
            />

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center z-50">
                <div className="bg-white border-2 border-gray-300 dark:border-gray-600 rounded-xl p-6 shadow-2xl">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                    <span className="ml-4 text-gray-700">Processing your booking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message - Mobile Optimized */}
            {error && (
              <div className="mx-6 mt-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-800 dark:text-red-200 px-5 py-4 rounded-lg" role="alert">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <form id="booking-form" onSubmit={handleSubmit} className="p-6 space-y-6 pb-32">
              {/* Date Picker - Mobile First */}
              <div className="space-y-4">
                <label className="block text-gray-900 dark:text-white text-lg font-bold">
                  📆 {t('bookme.date.label')} <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      locale={language === 'en' ? enUS : zhTW}
                      defaultMonth={new Date()}
                      modifiersClassNames={{
                        selected: 'bg-orange-500 text-white font-bold rounded-lg',
                        today: 'border-2 border-orange-400 rounded-lg font-bold text-orange-600 dark:text-orange-400',
                        disabled: 'text-gray-400 dark:text-gray-600 opacity-40 cursor-not-allowed',
                      }}
                      className="text-gray-900 dark:text-white touch-manipulation"
                      styles={{
                        caption: { color: 'inherit', fontSize: '1rem' },
                        head_cell: { color: 'inherit' },
                        cell: { color: 'inherit' },
                        day: { 
                          color: 'inherit',
                          minWidth: '44px',
                          minHeight: '44px',
                          fontSize: '0.95rem'
                        },
                        nav_button: { color: 'inherit', width: '44px', height: '44px' },
                      }}
                    />
                  </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t('bookme.date.required')}
                </p>
              </div>

              {/* Time Slots - Radio Card Style */}
              <div className="space-y-4">
                <label className="block text-gray-900 dark:text-white text-lg font-bold">
                  ⏰ {t('bookme.time.label')} <span className="text-red-500">*</span>
                </label>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[280px]">
                  {!selectedDate && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t('bookme.time.select')}
                      </p>
                    </div>
                  )}
                  {isFetchingSlots && (
                    <div className="flex flex-col items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-10 w-10 border-3 border-orange-400 border-t-transparent"></div>
                      <span className="mt-3 text-gray-600 dark:text-gray-400 text-sm">{t('bookme.time.loading')}</span>
                    </div>
                  )}
                  {selectedDate && !isFetchingSlots && availableSlots.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {t('bookme.time.no_slots')}
                      </p>
                    </div>
                  )}
                  {selectedDate && !isFetchingSlots && availableSlots.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`
                            min-h-[54px] px-4 py-3 rounded-xl text-base font-semibold 
                            transition-all duration-200 active:scale-95 touch-manipulation
                            ${selectedTimeSlot?.start === slot.start
                              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 border-2 border-orange-600 ring-2 ring-orange-300 dark:ring-orange-700'
                              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700'
                            }
                          `}
                        >
                          {slot.display}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {t('bookme.time.hour')}
                </p>
              </div>

              {/* Selected Date/Time Summary - Prominent */}
              {selectedDate && selectedTimeSlot && (
                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 border-2 border-orange-400 dark:border-orange-600 rounded-xl p-5 shadow-md">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-orange-900 dark:text-orange-300">{t('bookme.selected.title')}</span>
                  </div>
                  <p className="text-center">
                    <span className="text-gray-900 dark:text-white font-bold text-lg block sm:inline">
                      {format(selectedDate, language === 'en' ? 'MMM dd, yyyy (EEEE)' : 'yyyy年MM月dd日 (EEEE)', { locale: language === 'en' ? enUS : zhTW })}
                    </span>
                    <span className="hidden sm:inline text-gray-400 mx-2">•</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold text-lg block sm:inline mt-1 sm:mt-0">
                      {selectedTimeSlot.display}
                    </span>
                  </p>
                </div>
              )}

              {/* Visitor Information - Mobile Optimized Form */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-5">
                <h3 className="text-gray-900 dark:text-white text-lg font-bold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {t('bookme.visitor.title')}
                </h3>
                
                <div className="space-y-4">
                  {/* Name - Full Width */}
                  <div>
                    <label htmlFor="visitorName" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                      {t('bookme.visitor.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="visitorName"
                      name="name"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      required
                      autoComplete="name"
                      placeholder={t('bookme.visitor.placeholder.name')}
                      className={inputClassName}
                    />
                  </div>

                  {/* Email - Full Width with proper keyboard */}
                  <div>
                    <label htmlFor="visitorEmail" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                      {t('bookme.visitor.email')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="visitorEmail"
                      name="email"
                      inputMode="email"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder={t('bookme.visitor.placeholder.email')}
                      className={inputClassName}
                    />
                  </div>

                  {/* Phone - With tel keyboard */}
                  <div>
                    <label htmlFor="visitorPhone" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                      {t('bookme.visitor.phone')}
                    </label>
                    <input
                      type="tel"
                      id="visitorPhone"
                      name="tel"
                      inputMode="tel"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      autoComplete="tel"
                      placeholder={t('bookme.visitor.placeholder.phone')}
                      className={inputClassName}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="visitorCompany" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                      {t('bookme.visitor.company')}
                    </label>
                    <input
                      type="text"
                      id="visitorCompany"
                      name="organization"
                      value={visitorCompany}
                      onChange={(e) => setVisitorCompany(e.target.value)}
                      autoComplete="organization"
                      placeholder={t('bookme.visitor.placeholder.company')}
                      className={inputClassName}
                    />
                  </div>

                  {/* Message - Textarea */}
                  <div>
                    <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
                      {t('bookme.visitor.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      placeholder={t('bookme.visitor.placeholder.message')}
                      className={`${inputClassName} resize-none`}
                    />
                  </div>
                </div>
              </div>

            </form>            
          </div>
        </div>
      </main>

      {/* Sticky Bottom CTA - Mobile Optimized */}
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-2xl"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <button
            type="submit"
            form="booking-form"
            onClick={(e) => {
              e.preventDefault();
              const form = document.getElementById('booking-form') as HTMLFormElement;
              if (form) {
                form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
              }
            }}
            disabled={isLoading || !selectedTimeSlot || !selectedDate || !visitorName || !visitorEmail}
            className={`
              w-full min-h-[54px] font-bold text-lg rounded-xl 
              transition-all duration-300 active:scale-[0.98] 
              flex items-center justify-center gap-3 shadow-lg
              ${isLoading || !selectedTimeSlot || !selectedDate || !visitorName || !visitorEmail
                ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white shadow-orange-500/30 hover:shadow-orange-600/40'
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                <span>{t('bookme.submit.processing')}</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('bookme.submit.confirm')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 py-6 text-center border-t border-purple-900/30">
        <p className="text-orange-600/60">{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
