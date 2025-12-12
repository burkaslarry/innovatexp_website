// app/bookme/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format, startOfDay } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import Link from 'next/link';
import Image from 'next/image';

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

export default function BookVisitPage() {
  // Initialize with current date
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
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
      setAvailableSlots([]);
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
          <Link 
            href="/" 
            className="text-purple-300 hover:text-purple-200 transition-colors"
          >
            ← 返回首頁
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#1a1a2e] rounded-2xl shadow-2xl p-8 border border-purple-900/30">
            <h1 className="text-3xl font-bold text-center mb-2 text-white">
              📅 預約業務拜訪
            </h1>
            <p className="text-center text-purple-300 mb-8">
              一對一業務諮詢 | Book a Business Consultation
            </p>

            {/* Success Message */}
            {successMessage && (
              <div className="bg-teal-900/50 border border-teal-500 text-teal-200 px-6 py-4 rounded-lg mb-6" role="alert">
                <div className="flex items-center">
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{successMessage}</span>
                </div>
              </div>
            )}

            {/* WhatsApp Prompt */}
            {showWhatsAppPrompt && whatsappUrl && (
              <div className="bg-green-900/50 border-2 border-green-500 text-green-100 px-6 py-5 rounded-xl mb-6 shadow-lg" role="alert">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-bold text-green-200 mb-2">
                      📱 發送 WhatsApp 確認訊息
                    </h3>
                    <p className="text-green-100 mb-4">
                      您的預約已成功添加到 Notion 日曆！點擊下方按鈕發送確認訊息到 WhatsApp。
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30"
                        onClick={() => {
                          // Close prompt after opening WhatsApp
                          setTimeout(() => setShowWhatsAppPrompt(false), 2000);
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        打開 WhatsApp 發送
                      </a>
                      <button
                        onClick={() => setShowWhatsAppPrompt(false)}
                        className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg transition-colors"
                      >
                        稍後
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowWhatsAppPrompt(false)}
                    className="ml-4 text-green-300 hover:text-green-100"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
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
                    📆 選擇日期 <span className="text-red-400">*</span>
                  </label>
                  <div className="bg-[#16213e] rounded-xl p-4 border-2 border-purple-400/30 flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={disabledDays}
                      locale={zhTW}
                      defaultMonth={new Date()}
                      fromDate={new Date()} // Don't show dates before today
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
                    ⏰ 選擇時間 (1小時) <span className="text-red-400">*</span>
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
                    <span className="font-semibold">已選擇：</span>{' '}
                    <span className="text-white font-bold">
                      {format(selectedDate, 'yyyy年MM月dd日 (EEEE)', { locale: zhTW })}
                    </span>{' '}
                    <span className="text-purple-300">|</span>{' '}
                    <span className="text-white font-bold">{selectedTimeSlot.display}</span>
                  </p>
                </div>
              )}

              {/* Visitor Information */}
              <div className="border-t border-purple-900/30 pt-8">
                <h3 className="text-purple-200 text-lg font-semibold mb-6">
                  👤 訪客資訊
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="visitorName" className="block text-purple-300 text-sm font-medium mb-2">
                      您的姓名 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="visitorName"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      required
                      placeholder="請輸入您的姓名"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="visitorEmail" className="block text-purple-300 text-sm font-medium mb-2">
                      電子郵件 <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="visitorEmail"
                      value={visitorEmail}
                      onChange={(e) => setVisitorEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="visitorPhone" className="block text-purple-300 text-sm font-medium mb-2">
                      聯絡電話
                    </label>
                    <input
                      type="tel"
                      id="visitorPhone"
                      value={visitorPhone}
                      onChange={(e) => setVisitorPhone(e.target.value)}
                      placeholder="+852 1234 5678"
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="visitorCompany" className="block text-purple-300 text-sm font-medium mb-2">
                      公司名稱
                    </label>
                    <input
                      type="text"
                      id="visitorCompany"
                      value={visitorCompany}
                      onChange={(e) => setVisitorCompany(e.target.value)}
                      placeholder="您的公司名稱"
                      className={inputClassName}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="block text-purple-300 text-sm font-medium mb-2">
                    諮詢內容 / 留言
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="請簡述您想諮詢的內容，例如：AI 整合方案、系統開發需求、企業培訓等..."
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
                    <span>處理中...</span>
                  </>
                ) : (
                  <>
                    <span>📅</span>
                    <span>確認預約</span>
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
