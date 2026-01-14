// app/bookme/page.tsx
'use client';

import { useState, useEffect, FormEvent, useCallback } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, startOfDay } from 'date-fns';
import { zhTW, enUS } from 'date-fns/locale';
import Link from 'next/link';
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

  // Light purple input class for consistent styling
  const inputClassName = "w-full bg-white border-2 border-gray-300 dark:border-gray-600 rounded-lg py-3 px-4 text-gray-900 placeholder-purple-700 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30 transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#fffcf7] dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b-2 border-gray-200 dark:border-gray-700">
        <div className="container mx-auto py-6 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/innovatexp_black.svg"
              alt="InnovateXP Limited Logo"
              width={50}
              height={50}
              className="mr-4 dark:invert"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('bookme.header.title')}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('bookme.header.subtitle')}</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
            >
              {t('bookme.header.back')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-purple-900/30">
            <h1 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
              📅 {t('bookme.title')}
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
              {t('bookme.subtitle')}
            </p>

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

            {/* Error Message */}
            {error && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-6 py-4 rounded-lg mb-6" role="alert">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Info Section */}
            <div className="mt-8 pt-8 border-t border-purple-900/30">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-4">{t('bookme.info.title')}</h3>
              <ul className="text-gray-600/80 text-sm space-y-2">
                <li>{t('bookme.info.monday_friday')}</li>
                <li>{t('bookme.info.one_hour')}</li>
                <li>{t('bookme.info.confirmation')}</li>
                <li>{t('bookme.info.cancel')}</li>
                <li>{t('bookme.info.online')}</li>
              </ul>
            </div>
            <br />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Date and Time Selection - SAME ROW */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Date Picker */}
                <div className="flex-1 w-full md:w-auto">
                  <label className="block text-gray-900 dark:text-white text-xl font-bold mb-4">
                    📆 {t('bookme.date.label')} <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-300 dark:border-gray-600/30 flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      locale={language === 'en' ? enUS : zhTW}
                      defaultMonth={new Date()}
                      modifiersClassNames={{
                        selected: 'bg-orange-500 text-white font-bold rounded-full',
                        today: 'border-2 border-orange-400 rounded-full font-bold text-orange-600 dark:text-orange-400',
                        disabled: 'text-gray-600 dark:text-gray-500 opacity-50 cursor-not-allowed',
                      }}
                      className="text-gray-900 dark:text-white"
                      styles={{
                        caption: { color: 'inherit' },
                        head_cell: { color: 'inherit' },
                        cell: { color: 'inherit' },
                        day: { color: 'inherit' },
                        nav_button: { color: 'inherit' },
                      }}
                    />
                  </div>
                  <p className="text-orange-600/70 text-sm mt-2">
                    {t('bookme.date.required')}
                  </p>
                </div>

                {/* Time Slots */}
                <div className="flex-1 w-full md:w-auto">
                  <label className="block text-gray-900 dark:text-white text-xl font-bold mb-4">
                    ⏰ {t('bookme.time.label')} <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border-2 border-gray-300 dark:border-gray-600/30 min-h-[320px] overflow-y-auto">
                    {!selectedDate && (
                      <p className="text-orange-600/70 text-center py-8">
                        {t('bookme.time.select')}
                      </p>
                    )}
                    {isFetchingSlots && (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                        <span className="ml-3 text-gray-600">{t('bookme.time.loading')}</span>
                      </div>
                    )}
                    {selectedDate && !isFetchingSlots && availableSlots.length === 0 && (
                      <p className="text-orange-600/70 text-center py-8">
                        {t('bookme.time.no_slots')}
                      </p>
                    )}
                    {selectedDate && !isFetchingSlots && availableSlots.length > 0 && (
                      <div className="grid grid-cols-2 gap-3">
                        {availableSlots.map((slot, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                              ${selectedTimeSlot?.start === slot.start
                                ? 'bg-orange-500 text-white font-bold shadow-lg shadow-purple-500/30 scale-105 border-2 border-purple-300'
                                : 'bg-white text-gray-700 border-2 border-gray-300 dark:border-gray-600/30 hover:border-gray-300 hover:bg-purple-900/20'
                              }`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-orange-600/70 text-sm mt-2">
                    {t('bookme.time.hour')}
                  </p>
                </div>
              </div>

              {/* Selected Date/Time Summary */}
              {selectedDate && selectedTimeSlot && (
                <div className="bg-purple-900/30 border border-orange-400/50 rounded-xl p-4 text-center">
                  <p className="text-gray-700">
                    <span className="font-semibold">{t('bookme.selected.title')}</span>{' '}
                    <span className="text-gray-900 dark:text-white font-bold">
                      {format(selectedDate, language === 'en' ? 'MMM dd, yyyy (EEEE)' : 'yyyy年MM月dd日 (EEEE)', { locale: language === 'en' ? enUS : zhTW })}
                    </span>{' '}
                    <span className="text-gray-600">|</span>{' '}
                    <span className="text-gray-900 dark:text-white font-bold">{selectedTimeSlot.display}</span>
                  </p>
                </div>
              )}

              {/* Visitor Information */}
              <div className="border-t border-purple-900/30 pt-8">
                <h3 className="text-gray-700 dark:text-gray-300 text-lg font-semibold mb-6">
                  👤 {t('bookme.visitor.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visitorName" className="block text-gray-600 text-sm font-medium mb-2">
                      {t('bookme.visitor.name')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="visitorName"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      required
                      placeholder={t('bookme.visitor.placeholder.name')}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="visitorEmail" className="block text-gray-600 text-sm font-medium mb-2">
                      {t('bookme.visitor.email')} <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="visitorEmail"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      required
                      placeholder={t('bookme.visitor.placeholder.email')}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="visitorPhone" className="block text-gray-600 text-sm font-medium mb-2">
                      {t('bookme.visitor.phone')}
                    </label>
                    <input
                      type="tel"
                      id="visitorPhone"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder={t('bookme.visitor.placeholder.phone')}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="visitorCompany" className="block text-gray-600 text-sm font-medium mb-2">
                      {t('bookme.visitor.company')}
                    </label>
                    <input
                      type="text"
                      id="visitorCompany"
                      value={visitorCompany}
                      onChange={(e) => setVisitorCompany(e.target.value)}
                      placeholder={t('bookme.visitor.placeholder.company')}
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="block text-gray-600 text-sm font-medium mb-2">
                    {t('bookme.visitor.message')}
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={t('bookme.visitor.placeholder.message')}
                    className={`${inputClassName} resize-none`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !selectedTimeSlot || !selectedDate}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-gray-900 dark:text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 disabled:shadow-none flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600/50 hover:border-gray-300"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>{t('bookme.submit.processing')}</span>
                  </>
                ) : (
                  <>
                    <span>📅</span>
                    <span>{t('bookme.submit.confirm')}</span>
                  </>
                )}
              </button>
            </form>            
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-gray-950 py-6 text-center border-t border-purple-900/30">
        <p className="text-orange-600/60">{t('footer.copyright')}</p>
      </footer>
    </div>
  );
}
