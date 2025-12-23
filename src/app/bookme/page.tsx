// app/bookme/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
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

  // Fetch available slots when date changes
  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDate) {
        setAvailableSlots([]);
        return;
      }

      setIsFetchingSlots(true);
      setError(null);
      setSelectedTimeSlot(null);

      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
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
    }
    fetchSlots();
  }, [selectedDate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!selectedDate || !selectedTimeSlot || !visitorName || !visitorEmail) {
      setError('請填寫所有必填欄位並選擇日期和時間。');
      setIsLoading(false);
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)) {
      setError('請輸入有效的電子郵件地址。');
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
        throw new Error(errorData.error || '預約失敗，請稍後再試。');
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
        setSuccessMessage('您的業務拜訪預約已成功！已添加到 Notion 日曆。');
        
        // Reload available slots for the selected date to reflect the booking
        if (selectedDate) {
          async function reloadSlots() {
            try {
              const formattedDate = format(selectedDate, 'yyyy-MM-dd');
              const response = await fetch(`/api/calendar/slots?date=${formattedDate}`);
              if (response.ok) {
                const data = await response.json();
                setAvailableSlots(data.slots || []);
              }
            } catch (err) {
              console.warn('Failed to reload slots after booking:', err);
            }
          }
          reloadSlots();
        }
      } else {
        console.warn('⚠️ Not showing WhatsApp prompt');
        console.warn('   notionSuccess:', result.notionSuccess);
        console.warn('   whatsappMessage:', result.whatsappMessage ? 'exists' : 'null');
        // Still show success even if Notion failed
        setSuccessMessage('您的業務拜訪未能預約成功！盡快聯絡InnovateXP Limited : info@innovatexp.com');
      }
      // Reset form
      setSelectedDate(new Date());
      setSelectedTimeSlot(null);
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
  const inputClassName = "w-full bg-[#16213e] border-2 border-purple-400/50 rounded-lg py-3 px-4 text-white placeholder-purple-300/50 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 transition-all duration-200";

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black shadow-md border-b border-purple-900/30">
        <div className="container mx-auto py-6 px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/innovatexp_color_no_bg.svg"
              alt="InnovateXP Limited Logo"
              width={50}
              height={50}
              className="mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">InnovateXP Limited</h1>
              <p className="text-sm text-purple-300">預約業務拜訪</p>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link 
              href="/" 
              className="text-purple-300 hover:text-purple-200 transition-colors"
            >
              ← 返回首頁
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1a1a2e] rounded-2xl shadow-2xl p-8 border border-purple-900/30">
            <h1 className="text-3xl font-bold text-center mb-2 text-white">
              📅 {t('bookme.title')}
            </h1>
            <p className="text-center text-purple-300 mb-8">
              {t('bookme.subtitle')}
            </p>

            {/* Success Modal */}
            <Modal
              isOpen={successMessage !== null}
              type={successMessage && successMessage.includes('未能預約成功') ? 'error' : 'success'}
              title={successMessage && successMessage.includes('未能預約成功') ? '預約失敗' : '預約成功'}
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
              <h3 className="text-purple-200 font-semibold mb-4">📋 預約須知</h3>
              <ul className="text-purple-300/80 text-sm space-y-2">
                <li>• 預約時間為週一至週五，上午 9:00 至下午 5:00</li>
                <li>• 每個時段為 1 小時的一對一諮詢</li>
                <li>• 預約成功後，您將收到確認郵件及日曆邀請</li>
                <li>• 如需取消或更改預約，請提前 24 小時通知</li>
                <li>• 諮詢可選擇線上會議或實體拜訪</li>
              </ul>
            </div>
            <br />

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Date and Time Selection - SAME ROW */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Date Picker */}
                <div className="flex-1 w-full md:w-auto">
                  <label className="block text-purple-200 text-lg font-semibold mb-4">
                    📆 {t('bookme.date.label')} <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-[#16213e] rounded-xl p-4 border-2 border-purple-400/30 flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      locale={language === 'en' ? enUS : zhTW}
                      defaultMonth={new Date()}
                      modifiersClassNames={{
                        selected: 'bg-purple-500 text-white rounded-full',
                        today: 'border-2 border-purple-400 rounded-full font-bold',
                        disabled: 'text-gray-600 opacity-50 cursor-not-allowed',
                      }}
                      className="text-white"
                      styles={{
                        caption: { color: '#c4b5fd' },
                        head_cell: { color: '#a78bfa' },
                        cell: { color: 'white' },
                        day: { color: 'white' },
                        nav_button: { color: '#a78bfa' },
                      }}
                    />
                  </div>
                  <p className="text-purple-400/70 text-sm mt-2">
                    * 週六、週日不開放預約
                  </p>
                </div>

                {/* Time Slots */}
                <div className="flex-1 w-full md:w-auto">
                  <label className="block text-purple-200 text-lg font-semibold mb-4">
                    ⏰ {t('bookme.time.label')} <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-[#16213e] rounded-xl p-4 border-2 border-purple-400/30 min-h-[320px] overflow-y-auto">
                    {!selectedDate && (
                      <p className="text-purple-400/70 text-center py-8">
                        請先選擇日期
                      </p>
                    )}
                    {isFetchingSlots && (
                      <div className="flex items-center justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                        <span className="ml-3 text-purple-300">載入中...</span>
                      </div>
                    )}
                    {selectedDate && !isFetchingSlots && availableSlots.length === 0 && (
                      <p className="text-purple-400/70 text-center py-8">
                        此日期沒有可用的時間段。<br />請選擇其他日期。
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
                                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30 scale-105 border-2 border-purple-300'
                                : 'bg-[#1a1a2e] text-purple-200 border-2 border-purple-400/30 hover:border-purple-400 hover:bg-purple-900/20'
                              }`}
                          >
                            {slot.display}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="text-purple-400/70 text-sm mt-2">
                    * 每個時段為 1 小時的一對一諮詢
                  </p>
                </div>
              </div>

              {/* Selected Date/Time Summary */}
              {selectedDate && selectedTimeSlot && (
                <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 text-center">
                  <p className="text-purple-200">
                    <span className="font-semibold">{t('bookme.selected.title')}</span>{' '}
                    <span className="text-white font-bold">
                      {format(selectedDate, language === 'en' ? 'MMM dd, yyyy (EEEE)' : 'yyyy年MM月dd日 (EEEE)', { locale: language === 'en' ? enUS : zhTW })}
                    </span>{' '}
                    <span className="text-purple-300">|</span>{' '}
                    <span className="text-white font-bold">{selectedTimeSlot.display}</span>
                  </p>
                </div>
              )}

              {/* Visitor Information */}
              <div className="border-t border-purple-900/30 pt-8">
                <h3 className="text-purple-200 text-lg font-semibold mb-6">
                  👤 {t('bookme.visitor.title')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visitorName" className="block text-purple-300 text-sm font-medium mb-2">
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
                    <label htmlFor="visitorEmail" className="block text-purple-300 text-sm font-medium mb-2">
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
                    <label htmlFor="visitorPhone" className="block text-purple-300 text-sm font-medium mb-2">
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
                    <label htmlFor="visitorCompany" className="block text-purple-300 text-sm font-medium mb-2">
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
                  <label htmlFor="message" className="block text-purple-300 text-sm font-medium mb-2">
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
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30 disabled:shadow-none flex items-center justify-center gap-2 border-2 border-purple-400/50 hover:border-purple-400"
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
      <footer className="bg-black py-6 text-center border-t border-purple-900/30">
        <p className="text-purple-400/60">© 2025 InnovateXP Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}
