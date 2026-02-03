"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Header
    'header.title': 'InnovateXP Limited',
    'header.subtitle': 'Innovate • Transform • Experience',
    
    // Hero Section
    'hero.title': 'Your Strongest AI Architect',
    'hero.tagline': 'Elevate your business with AI and Blueprint',
    'hero.description': "Leave behind high competition and low margins - create unique value with our AI-driven solutions.",
    'hero.cta': 'Contact Us',
    'hero.book_meeting': 'Book Business Consultation',
    
    // Bookme Page
    'bookme.title': '📅 Book Business Consultation',
    'bookme.subtitle': 'One-on-One Business Consultation',
    'bookme.header.title': 'InnovateXP Limited',
    'bookme.header.subtitle': 'Book Business Consultation',
    'bookme.header.back': '← Back to Home',
    'bookme.success.title': 'Your business consultation booking has been successful! Added to Notion calendar.',
    'bookme.success.subtitle': 'Your business consultation booking was not successful! Please contact InnovateXP Limited ASAP: info@innovatexp.com',
    'bookme.whatsapp.title': '📱 Send WhatsApp Confirmation Message',
    'bookme.whatsapp.message': 'Your booking has been successfully added to Notion calendar! Click the button below to send confirmation message to WhatsApp.',
    'bookme.whatsapp.button': 'Open WhatsApp to Send',
    'bookme.whatsapp.later': 'Later',
    'bookme.error.title': 'Please fill in all required fields and select date and time.',
    'bookme.error.email': 'Please enter a valid email address.',
    'bookme.error.slots': 'Unable to fetch available time slots',
    'bookme.error.fetch': 'Failed to fetch time slots',
    'bookme.error.booking': 'Booking failed, please try again later.',
    'bookme.error.general': 'Booking failed',
    'bookme.info.title': '📋 Booking Information',
    'bookme.info.monday_friday': '• Booking time is Monday to Friday, 9:00 AM to 5:00 PM',
    'bookme.info.one_hour': '• Each session is 1 hour of one-on-one consultation',
    'bookme.info.confirmation': '• After successful booking, you will receive confirmation email and calendar invitation',
    'bookme.info.cancel': '• For cancellation or changes, please notify 24 hours in advance',
    'bookme.info.online': '• Consultation can choose online meeting or in-person visit',
    'bookme.date.label': '📅 Select Date',
    'bookme.date.required': '* Not available on weekends (Saturday and Sunday)',
    'bookme.time.label': '⏰ Select Time (1 hour)',
    'bookme.time.select': 'Please select a date first',
    'bookme.time.loading': 'Loading...',
    'bookme.time.no_slots': 'No available time slots for this date.<br />Please select another date.',
    'bookme.time.hour': '* Each session is 1 hour of one-on-one consultation',
    'bookme.selected.title': 'Selected:',
    'bookme.visitor.title': '👤 Visitor Information',
    'bookme.visitor.name': 'Your Name',
    'bookme.visitor.email': 'Email',
    'bookme.visitor.phone': 'Contact Phone',
    'bookme.visitor.company': 'Company Name',
    'bookme.visitor.message': 'Consultation Content / Message',
    'bookme.visitor.placeholder.name': 'Please enter your name',
    'bookme.visitor.placeholder.email': 'your@email.com',
    'bookme.visitor.placeholder.phone': '+852 1234 5678',
    'bookme.visitor.placeholder.company': 'Your company name',
    'bookme.visitor.placeholder.message': 'Please briefly describe what you want to consult about, such as: AI integration solutions, system development needs, corporate training, etc...',
    'bookme.submit.processing': 'Processing...',
    'bookme.submit.confirm': 'Confirm Booking',
    'bookme.modal.success.title': 'Booking Successful',
    'bookme.modal.error.title': 'Booking Failed',

    // Vision Section
    'vision.title': 'Our Vision',
    'vision.brand': 'InnovateXP Limited',
    'vision.tagline': 'Innovate • Transform • Experience',
    'vision.description': 'At InnovateXP, we believe every business deserves to harness the power of AI and data-driven insights. We don\'t just build software—we architect your competitive advantage. From event management to customer relationships, we transform complex challenges into elegant solutions that drive measurable growth.',
    'vision.innovate': 'Innovate',
    'vision.innovate_desc': 'Challenge the status quo with AI-powered solutions that turn data into your strategic asset.',
    'vision.transform': 'Transform',
    'vision.transform_desc': 'Evolve your business operations from manual processes to intelligent automation.',
    'vision.experience': 'Experience',
    'vision.experience_desc': 'Deliver exceptional results that exceed expectations and create lasting impact.',

    // Core Services Section (Three Main Services)
    'services.title': 'Our Core Services',
    'services.ai_crm.title': 'AI × CRM',
    'services.ai_crm.subtitle': 'Intelligent Customer Management System',
    'services.ai_crm.benefit1': 'Lightning-fast responses with AI Smart Draft',
    'services.ai_crm.benefit2': 'Automated booking handling',
    'services.ai_crm.benefit3': 'Eliminate missed orders with auto-tagging',
    'services.ai_crm.cta': 'Learn About AI CRM Solution',
    'services.checkin.title': 'Check-in System',
    'services.checkin.subtitle': 'EventXP',
    'services.checkin.benefit1': 'Real-time attendee list',
    'services.checkin.benefit2': 'QR code scanning',
    'services.checkin.benefit3': 'Automated statistics',
    'services.checkin.cta': 'Learn About Check-in System',
    'services.courses.title': 'AI Consulting Services',
    'services.courses.subtitle': 'Help Enterprises Deploy AI from 0 to 1',
    'services.courses.benefit1': 'Implementation Assessment: Significantly reduce trial-and-error costs',
    'services.courses.benefit2': 'Customized AI Agent & Architecture Design',
    'services.courses.benefit3': 'Hands-on Prompt Engineering Training',
    'services.courses.cta': 'Learn About Consulting Services',
    
    // About Section - REVISED: Technical Authority & Corrected Facts
    'about.title': 'About Us',
    'about.intro.title': 'About InnovateXP Limited',
    'about.intro.p1': "Founded by Larry Lo, former Organizer of Google Developer Group Hong Kong (until 2025) and HKSTP Incubation alumnus (2017-2019). We are not just consultants; we are hands-on system architects.",
    'about.intro.p2': 'Our Philosophy: "Connecting Technology through Passion, Perfection, and Premier standards." We leverage years of experience in System Design and Real-world Development to help you build your "Desert Oasis".',
    'about.intro.p3': 'We combine the agility of modern tech stacks with the stability required for enterprise operations, delivering practical, actionable AI solutions.',
    
    'about.tags.title': 'Our Strategy & Capability',
    'about.tags.red_ocean.title': 'Red Ocean Dilemma',
    'about.tags.red_ocean.description': 'High competition, low margins. Doing what everyone else does only dilutes your value. You need a technological edge to escape.',
    'about.tags.desert_oasis.title': 'Desert Oasis Strategy',
    'about.tags.desert_oasis.description': 'Use AI to build a data moat. Create unique value that competitors cannot easily copy, establishing your own blue ocean.',
    'about.tags.community.title': 'Proven Technical Capability',
    'about.tags.community.description': 'Founder Larry Lo brings proven experience in architecting systems that handle 2,000+ active participants. We focus on robust execution over empty talk.',
    
    'about.story.title': 'Mission & 2026 Roadmap',
    'about.story.content': 'InnovateXP empowers organizations to upgrade their business through AI and strategic system blueprints. 2026 Roadmap: Jan (Now) - EventXP Launch; Feb - SmartSales CRM; Mar - AI Playbook; Apr - SME Masterclass. We are committed to practical implementation.',

    // Partnership Section
    'partnership.title': 'Trusted Partners & Affiliations',
    'partnership.subtitle': 'Building Innovation Through Strategic Partnerships',
    'partnership.agilizing.title': 'Agilizing Education Center',
    'partnership.agilizing.desc': 'Professional education and training for business agility and transformation',
    'partnership.bni_anchor.title': 'BNI Anchor',
    'partnership.bni_anchor.desc': 'Strategic business referral network and leadership development in BNI',
    'partnership.linkedinlocal.title': 'LinkedInLocal Asia',
    'partnership.linkedinlocal.desc': 'Connecting professionals through local networking events across the Asia-Pacific region',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Please leave a message, we will get back to you as soon as possible.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email Address',
    'contact.form.content': 'Content',
    'contact.form.placeholder': 'Please fill in',
    'contact.form.submit': 'Send Email',
    'contact.form.success': 'Email Sent',
    
    // Story Section (3-Step)
    'story.title': 'Our Strategy',
    'story.step1.title': 'Red Ocean Dilemma',
    'story.step1.description': 'High competition, low margins, everyone doing the same thing',
    'story.step2.title': 'Desert Oasis',
    'story.step2.description': 'Create unique value with AI to escape competition',
    'story.step3.title': 'Cola Theory',
    'story.step3.description': 'Same product, different value based on context and environment',
    
    // Ideal Client Section
    'ideal.title': 'Ideal Referral / Ideal Client Profile',
    'ideal.subtitle': 'Problems We Solve for SMEs',
    'ideal.problem1': 'Too many WhatsApp queries',
    'ideal.problem2': 'Missed orders',
    'ideal.problem3': 'Excel chaos',
    'ideal.problem4': 'Lack of CRM automation',
    'ideal.value': 'Clear value proposition for SMEs',
    
    // Founder Section
    'founder.title': 'Founder & Credentials',
    'founder.name': 'Larry Lo',
    'founder.credential1': 'SAFe Certified',
    'founder.credential2': 'Google Developer Group Speaker',
    'founder.credential3': '200+ Developer Training Experience',
    'founder.credential4': 'HKSTP Incubation',
    'founder.credential5': 'JCI/BNI Leadership',
    
    // Achievements Section
    'achievements.title': 'Track Record & Impact',
    'achievements.kmb': 'KMB / Government Projects',
    'achievements.government': 'High-risk environment systems',
    'achievements.sme': 'SME Projects',
    'achievements.engagement': 'Boosted user engagement by 100%',
    'achievements.case': 'AI × CRM success story',
    
    // Credibility Badges
    'credibility.title': 'Partners & Recognition',
    'credibility.gdg': 'GDG Hong Kong',
    'credibility.hku': 'HKU',
    'credibility.hkstp': 'HKSTP',
    'credibility.jci': 'JCI',
    'credibility.bni': 'BNI',
    
    // Product Showcases
    'showcase.title': 'Solution Showcases',
    'showcase.problem_label': 'Problem:',
    'showcase.solution_label': 'Solution:',
    'showcase.features_label': 'Key Features:',
    'showcase.screenshot_coming': 'Product screenshot coming soon',
    'showcase.checkin.title': 'EventXP',
    'showcase.checkin.subtitle': 'QR Code + Real-time Sync',
    'showcase.checkin.problem': 'Manual check-in prone to errors and missing data, time-consuming post-event statistics',
    'showcase.checkin.solution': 'QR Code scanning check-in, instantly syncs to database, chapter leaders can view attendance rates and reports anytime',
    'showcase.checkin.features': 'QR Code fast check-in; Auto statistics reports; Live participant list; Multi-event support',
    'showcase.checkin.cta': 'Book Demo for Check-in System',
    'showcase.booking.title': 'Booking / Reservation System',
    'showcase.booking.subtitle': 'Notion Calendar + Email + WhatsApp Notifications',
    'showcase.booking.problem': 'Back-and-forth WhatsApp time confirmations, scattered calendars, easy to double-book or miss appointments',
    'showcase.booking.solution': 'Clients self-select time slots, system auto-checks availability, instantly adds to Notion Calendar upon confirmation with .ics calendar attachment and WhatsApp confirmation',
    'showcase.booking.features': 'Visual calendar selection; Real-time availability check; Notion Calendar sync; Auto-send .ics email attachment',
    'showcase.booking.cta': 'Book Demo for Booking System',
    'showcase.ai_crm.title': 'AI × CRM',
    'showcase.ai_crm.subtitle': 'Intelligent Customer Relationship Management System',
    'showcase.ai_crm.problem': 'WhatsApp messages scattered everywhere, manual recording prone to errors, no systematic way to track customer status and sales progress',
    'showcase.ai_crm.solution': 'Integrated AI for auto-tagging, draft replies, follow-up reminders, centralized customer information management with sales funnel at a glance',
    'showcase.ai_crm.feature1': 'AI Smart Draft - Quickly generate professional replies',
    'showcase.ai_crm.feature2': 'Auto-tagging - Automatic customer status categorization',
    'showcase.ai_crm.feature3': 'Follow-up reminders - Eliminate missed orders',
    'showcase.ai_crm.feature4': 'Sales funnel - Visualize customer journey management',
    'showcase.ai_crm.cta': 'Book Demo for AI CRM',
    'ideal.cta': 'Book Consultation Now',
    
    // Pricing Section
    'pricing.title': 'Pricing Packages',
    'pricing.subtitle': 'Data Monetization + Community Retention = Long-term Growth',
    'pricing.promotion': 'Q1 Launch Special',
    'pricing.promotion_detail': 'Sign up for 1 year, get 1 Man-day Custom Consultation FREE',
    
    // EventXP Product
    'pricing.insight.name': 'EventXP',
    'pricing.insight.tagline': 'Turn Event Data into Revenue Growth',
    'pricing.insight.subtitle': 'Intelligent Event Data System',
    'pricing.insight.description': 'Stop letting your visitor data sleep in Excel. Transform attendance records into deep customer insights and sustainable business growth.',
    'pricing.insight.value': 'Predict attendee interests, retain community members, and precisely target next year\'s buyers.',
    
    'pricing.insight.tier1.name': 'Professional',
    'pricing.insight.tier1.price': 'HKD $2,480',
    'pricing.insight.tier1.period': '/ month',
    'pricing.insight.tier1.target': 'For organizations hosting frequent small events (Training centers / Associations)',
    'pricing.insight.tier1.feature1': 'Unlimited event creation',
    'pricing.insight.tier1.feature2': 'QR Code check-in system',
    'pricing.insight.tier1.feature3': 'Real-time attendance reports',
    'pricing.insight.tier1.feature4': 'Auto-generated monthly CSV reports',
    
    'pricing.insight.tier2.name': 'AI Growth',
    'pricing.insight.tier2.price': 'HKD $2,880',
    'pricing.insight.tier2.period': '/ month',
    'pricing.insight.tier2.subtitle': '(Only +$400 more than Professional)',
    'pricing.insight.tier2.badge': 'Best Value',
    'pricing.insight.tier2.target': 'For companies that value data ROI and community retention',
    'pricing.insight.tier2.feature1': 'All Professional features, PLUS AI Growth Engine:',
    'pricing.insight.tier2.feature2': '🕵️ AI Interest Decoding: Stop guessing what visitors like. AI analyzes check-in behavior to predict attendee interests.',
    'pricing.insight.tier2.feature3': '🧲 Retention Strategy Engine: Customer acquisition costs rising? AI suggests next season themes to bring old customers back.',
    'pricing.insight.tier2.feature4': '🎯 Smart Conversion List: One-click generate high-potential buyer list for next year\'s events.',
    'pricing.insight.tier2.note': '💡 Why choose this plan? "Hiring a data analyst costs $20,000/month, but EventXP AI only costs +$400." Don\'t waste budget on blind advertising. For the price of a lunch, get AI to find your next big client.',
    
    'pricing.insight.tier3.name': 'Enterprise',
    'pricing.insight.tier3.price': 'Custom Quote',
    'pricing.insight.tier3.period': '(Man-day based)',
    'pricing.insight.tier3.target': 'For large conferences / special workflow requirements',
    'pricing.insight.tier3.feature1': 'Custom registration workflow',
    'pricing.insight.tier3.feature2': 'API integration (CRM/ERP)',
    'pricing.insight.tier3.feature3': 'On-site technical support',
    
    // SmartSales CRM Product
    'pricing.crm.name': 'SmartSales CRM',
    'pricing.crm.tagline': 'Clone Your Best Salesperson with AI',
    'pricing.crm.subtitle': 'AI Sales Growth Engine',
    'pricing.crm.description': 'Let AI become your top sales assistant. From writing emails, scheduling to analysis - automate tedious work so you can focus on closing deals.',
    'pricing.crm.value': 'Automate follow-ups, appointments and analysis - save 70% admin time.',
    
    'pricing.crm.feature1.title': 'AI Smart Writing & Reply',
    'pricing.crm.feature1.desc': 'Context-aware responses: When customers say "too expensive", AI auto-drafts a value-focused reply for you to edit.',
    'pricing.crm.feature2.title': 'Intelligent Scheduling',
    'pricing.crm.feature2.desc': 'Auto-booking: Integrates with Google/Outlook Calendar, AI bot confirms availability in chat and sends meeting invites.',
    'pricing.crm.feature3.title': 'Insight Reporting',
    'pricing.crm.feature3.desc': 'Sales forecasting: AI analyzes current pipeline and predicts monthly revenue achievement rate.',
    
    'pricing.crm.tier1.name': 'Starter',
    'pricing.crm.tier1.price': 'HKD $2,800',
    'pricing.crm.tier1.period': '/ month',
    'pricing.crm.tier1.target': 'Lightweight version',
    'pricing.crm.tier1.feature1': 'Basic CRM functions (Customer database)',
    'pricing.crm.tier1.feature2': 'Basic AI writing (Email draft)',
    'pricing.crm.tier1.feature3': 'Standard sales reports',
    
    'pricing.crm.tier2.name': 'Pro',
    'pricing.crm.tier2.price': 'HKD $4,800',
    'pricing.crm.tier2.period': '/ month',
    'pricing.crm.tier2.badge': 'Full AI Power',
    'pricing.crm.tier2.target': 'Full AI features',
    'pricing.crm.tier2.feature1': 'Advanced AI: Auto-reply suggestions, smart scheduling, churn alerts',
    'pricing.crm.tier2.feature2': 'Insight Reports: AI sales forecasting & strategic recommendations',
    'pricing.crm.tier2.feature3': 'WhatsApp / Email dual integration',
    
    'pricing.crm.tier3.name': 'Setup Fee',
    'pricing.crm.tier3.price': 'From HKD $15,000',
    'pricing.crm.tier3.period': '(One-time)',
    'pricing.crm.tier3.target': 'System onboarding',
    'pricing.crm.tier3.feature1': 'Migrate existing data',
    'pricing.crm.tier3.feature2': 'Train custom AI prompts for your products',
    'pricing.crm.tier3.feature3': 'Staff training workshop',
    
    'pricing.cta': 'Book Consultation',
    'pricing.contact': 'Contact for Details',
    
    // Roadmap Section
    'roadmap.title': '2026 Roadmap',
    'roadmap.jan': 'January - Check-in System Launch',
    'roadmap.feb': 'February - AI Customer Management System',
    'roadmap.mar': 'March - AI Practical Handbook',
    'roadmap.apr': 'April - SME AI Practical Course',
    
    // Newsletter Section
    'newsletter.title': 'Stay Updated',
    'newsletter.subtitle': 'Subscribe to our newsletter for the latest AI insights and updates',
    'newsletter.name': 'Your Name',
    'newsletter.email': 'Your Email',
    'newsletter.interests': 'Interests',
    'newsletter.interest.ai': 'AI',
    'newsletter.interest.tech': 'Tech',
    'newsletter.interest.crm': 'CRM',
    'newsletter.interest.events': 'Events',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.success': 'Successfully subscribed! Thank you for joining us.',
    'newsletter.error': 'Subscription failed. Please try again.',
    
    // AI Consulting Section
    'ai_consulting.title': 'AI Consulting Services',
    'ai_consulting.subtitle': 'From Strategy to Implementation',
    'ai_consulting.description': 'We help businesses navigate the AI landscape with practical, results-driven consulting.',
    'ai_consulting.package1.name': 'AI Readiness Audit',
    'ai_consulting.package1.price': 'Starting from HKD $8,000',
    'ai_consulting.package1.desc': 'Comprehensive assessment of your organization\'s AI readiness and opportunities',
    'ai_consulting.package1.feature1': 'Current state analysis',
    'ai_consulting.package1.feature2': 'AI opportunity identification',
    'ai_consulting.package1.feature3': 'Implementation roadmap',
    'ai_consulting.package2.name': 'Custom Agent Build',
    'ai_consulting.package2.price': 'Starting from HKD $25,000',
    'ai_consulting.package2.desc': 'Tailored AI agents designed for your specific business needs',
    'ai_consulting.package2.feature1': 'Custom workflow design',
    'ai_consulting.package2.feature2': 'Integration with existing systems',
    'ai_consulting.package2.feature3': 'Ongoing support & optimization',
    'ai_consulting.package3.name': 'Prompt Training Bootcamp',
    'ai_consulting.package3.price': 'Starting from HKD $12,000',
    'ai_consulting.package3.desc': 'Hands-on training for your team to master AI prompting',
    'ai_consulting.package3.feature1': 'Interactive workshops',
    'ai_consulting.package3.feature2': 'Real-world case studies',
    'ai_consulting.package3.feature3': 'Custom prompt library',
    
    // Navigation
    'nav.home': 'Home',
    'nav.eventxp': 'EventXP',
    'nav.smartsales': 'SmartSales CRM',
    'nav.ai_consulting': 'AI Consulting',
    'nav.vision': 'Vision',
    'nav.partnership': 'Partnership',
    
    // Footer
    'footer.copyright': `© ${new Date().getFullYear()} InnovateXP Limited. All rights reserved.`,
    
    // FAQ Sections
    'faq.smartsales.title': 'SmartSales CRM - Frequently Asked Questions',
    'faq.smartsales.q1': 'What is AI CRM and how does it differ from traditional CRM?',
    'faq.smartsales.a1': 'AI CRM is customer relationship management software enhanced with artificial intelligence. Unlike traditional CRM that only stores data, AI CRM automatically drafts follow-up messages, predicts which leads will convert, and prioritizes prospects based on behavior patterns. It saves SMEs 3+ hours daily on repetitive sales tasks.',
    'faq.smartsales.q2': 'Can AI CRM integrate with WhatsApp for Hong Kong businesses?',
    'faq.smartsales.a2': 'Yes. SmartSales CRM integrates directly with WhatsApp Business API, allowing Hong Kong businesses to receive inquiries, auto-draft responses in Cantonese or English, and track conversation history—all within one dashboard. Human approval is required before sending.',
    'faq.smartsales.q3': 'How much does AI CRM cost in Hong Kong?',
    'faq.smartsales.a3': 'SmartSales CRM starts from HKD 2,800/month for the Starter plan and HKD 4,800/month for the Pro plan with full AI features. Enterprise pricing depends on user count and integration requirements. Contact us for a custom quote.',
    'faq.smartsales.q4': 'How long does it take to implement AI CRM?',
    'faq.smartsales.a4': 'Basic setup takes 1-2 weeks including data migration and team training. Full WhatsApp integration and custom workflows typically require 3-4 weeks. We provide hands-on onboarding support throughout.',
    'faq.smartsales.q5': 'What ROI can I expect from AI-powered customer management?',
    'faq.smartsales.a5': 'Clients typically see 70% reduction in missed follow-ups, 3+ hours saved daily on manual tasks, and 40% improvement in lead response time within the first month.',
    
    'faq.eventxp.title': 'EventXP - Frequently Asked Questions',
    'faq.eventxp.q1': 'What is EventXP event check-in system?',
    'faq.eventxp.a1': 'EventXP is an event intelligence platform that transforms check-ins into business insights. Beyond attendance tracking, it predicts which attendees are most likely to buy, renew memberships, or require follow-up—turning event data into actionable sales leads.',
    'faq.eventxp.q2': 'How does QR code check-in work for events?',
    'faq.eventxp.a2': 'Guests receive a unique QR code via email or WhatsApp. At the event, staff scan the code using EventXP\'s mobile app. The system instantly logs attendance, matches the guest profile to your CRM, and can trigger automated follow-ups post-event.',
    'faq.eventxp.q3': 'Can EventXP handle multiple simultaneous events?',
    'faq.eventxp.a3': 'Yes. EventXP supports unlimited concurrent events with separate dashboards, real-time attendance tracking, and consolidated reporting across all events.',
    'faq.eventxp.q4': 'What is the cost of EventXP event management system?',
    'faq.eventxp.a4': 'EventXP Professional starts at HKD 2,480/month with unlimited event creation and QR code check-in. The AI Growth plan is HKD 2,880/month and includes AI-powered attendee interest prediction and retention strategies.',
    
    'faq.aiconsulting.title': 'AI Consulting - Frequently Asked Questions',
    'faq.aiconsulting.q1': 'What is prompt engineering training?',
    'faq.aiconsulting.a1': 'Prompt engineering training teaches your team how to effectively communicate with AI systems like ChatGPT, Claude, or custom AI agents. Our hands-on bootcamp covers prompt structure, context optimization, output refinement, and real-world business applications specific to your industry.',
    'faq.aiconsulting.q2': 'How do you assess AI readiness for SMEs?',
    'faq.aiconsulting.a2': 'Our AI Readiness Audit (from HKD 8,000) analyzes your current workflows, data infrastructure, team capabilities, and business goals. We identify high-ROI AI opportunities, assess technical requirements, and provide a phased implementation roadmap tailored to your budget and resources.',
    'faq.aiconsulting.q3': 'What industries do you provide AI consulting for?',
    'faq.aiconsulting.a3': 'We specialize in AI solutions for service-based SMEs including education centers, event organizers, professional services, training providers, and B2B companies in Hong Kong. Our founder has 14 years of tech experience and has managed systems for 2,000+ participants.',
    'faq.aiconsulting.q4': 'How long does custom AI agent development take?',
    'faq.aiconsulting.a4': 'Custom AI agent projects typically take 4-8 weeks from requirements gathering to deployment. This includes workflow design, integration with your existing systems, testing, and staff training. Pricing starts from HKD 25,000.',
    
    // Answer-first content sections
    'eventxp.what.title': 'What is EventXP Event Check-in System?',
    'eventxp.what.answer': 'EventXP is an event intelligence platform that transforms check-ins into business insights. Beyond attendance tracking, it uses AI to predict which attendees are most likely to buy, renew memberships, or require follow-up—turning event data into actionable sales leads for Hong Kong event organizers.',
    'eventxp.how.title': 'How Does QR Code Check-in Work?',
    'eventxp.how.step1': 'Guests receive a unique QR code via email or WhatsApp',
    'eventxp.how.step2': 'Staff scan the code using EventXP mobile app at the event',
    'eventxp.how.step3': 'System instantly logs attendance and matches guest profile',
    'eventxp.how.step4': 'Automated follow-ups are triggered post-event based on behavior',
    
    'aicrm.what.title': 'What is AI CRM?',
    'aicrm.what.answer': 'AI CRM is customer relationship management software enhanced with artificial intelligence that automatically drafts follow-up messages, predicts lead conversion, and prioritizes prospects. Unlike traditional CRM that only stores data, AI CRM saves SMEs 3+ hours daily on repetitive sales tasks through intelligent automation.',
    'aicrm.benefits.title': 'Top 5 Benefits of AI CRM for Hong Kong SMEs:',
    'aicrm.benefits.1': 'Automated follow-ups reduce missed opportunities by 70%',
    'aicrm.benefits.2': 'Smart scheduling eliminates double-booking and saves 3+ hours daily',
    'aicrm.benefits.3': 'AI-powered responses improve lead response time by 40%',
    'aicrm.benefits.4': 'Sales forecasting with 85% accuracy for better planning',
    'aicrm.benefits.5': 'WhatsApp integration tailored for Hong Kong business communication',
    'aicrm.pricing.title': 'AI CRM Pricing Comparison Hong Kong',
    'aicrm.pricing.plan': 'Plan',
    'aicrm.pricing.price': 'Price (HKD/month)',
    'aicrm.pricing.bestfor': 'Best For',
    'aicrm.pricing.features': 'Key Features',
    'aicrm.pricing.starter': 'Starter',
    'aicrm.pricing.starter.price': '$2,800',
    'aicrm.pricing.starter.for': 'Small teams',
    'aicrm.pricing.starter.features': 'Basic CRM + AI Email Draft',
    'aicrm.pricing.pro': 'Pro ⭐',
    'aicrm.pricing.pro.price': '$4,800',
    'aicrm.pricing.pro.for': 'Growing businesses',
    'aicrm.pricing.pro.features': 'Full AI + WhatsApp + Forecasting',
    'aicrm.pricing.setup': 'Setup Fee',
    'aicrm.pricing.setup.price': '$15,000+',
    'aicrm.pricing.setup.for': 'One-time',
    'aicrm.pricing.setup.features': 'Data migration + Training',
    
    'aiconsulting.what.title': 'What AI Consulting Services Do We Offer?',
    'aiconsulting.what.answer': 'InnovateXP provides three core AI consulting services for Hong Kong SMEs: AI Readiness Audits (from HKD 8,000) to assess your implementation opportunities, Custom Agent Build (from HKD 25,000) for tailored AI solutions, and Prompt Engineering Training (from HKD 12,000) for hands-on team skill development.',
    'aiconsulting.who.title': 'Who Needs AI Implementation Consulting?',
    'aiconsulting.who.intro': 'AI consulting is ideal for Hong Kong SMEs who:',
    'aiconsulting.who.1': 'Want to adopt AI but don\'t know where to start',
    'aiconsulting.who.2': 'Need to reduce trial-and-error costs in AI implementation',
    'aiconsulting.who.3': 'Require custom AI agents for specific business workflows',
    'aiconsulting.who.4': 'Want their team trained in practical prompt engineering',
    'aiconsulting.who.5': 'Seek expert guidance from a 14-year tech veteran',
    
    'about.author.byline': 'By',
    'about.author.title': 'Founder of InnovateXP | 14-year Tech Veteran | AI Consultant | Former GDG Hong Kong Organizer',
    'about.author.updated': 'Last Updated:',
    'about.credentials.title': 'Credentials & Affiliations',
    'about.credentials.experience': 'Tech Experience',
    'about.credentials.participants': 'Event Participants',
  },
  zh: {
    // Header
    'header.title': 'InnovateXP Limited',
    'header.subtitle': '客戶管理系統、企業AI培訓、專業IT諮詢服務',
    
    // Hero Section
    'hero.title': '與你伴行的最強AI建築師',
    'hero.tagline': '攞抱 AI 新藍圖，成就營商新高度',
    'hero.description': '擺脫高競爭與低利潤的困境，利用我們的AI驅動解決方案創造獨特價值。',
    'hero.cta': '聯絡我們',
    'hero.book_meeting': '預約業務交流',
    
    // Bookme Page
    'bookme.title': '預約業務拜訪',
    'bookme.subtitle': '一對一業務諮詢',
    'bookme.header.title': 'InnovateXP Limited',
    'bookme.header.subtitle': '預約業務拜訪',
    'bookme.header.back': '← 返回首頁',
    'bookme.success.title': '您的業務拜訪預約已成功！已添加到  InnovateXP Limited 日曆。',
    'bookme.success.subtitle': '您的業務拜訪未能預約成功！盡快聯絡InnovateXP Limited : info@innovatexp.com',
    'bookme.whatsapp.title': '📱 發送 WhatsApp 確認訊息',
    'bookme.whatsapp.message': '您的預約已成功添加到 InnovateXP Limited 日曆！點擊下方按鈕發送確認訊息到 WhatsApp。',
    'bookme.whatsapp.button': '打開 WhatsApp 發送',
    'bookme.whatsapp.later': '稍後',
    'bookme.error.title': '請填寫所有必填欄位並選擇日期和時間。',
    'bookme.error.email': '請輸入有效的電子郵件地址。',
    'bookme.error.slots': '無法獲取可用時段',
    'bookme.error.fetch': '獲取時段失敗',
    'bookme.error.booking': '預約失敗，請稍後再試。',
    'bookme.error.general': '預約失敗',
    'bookme.info.title': '📋 預約須知',
    'bookme.info.monday_friday': '• 預約時間為週一至週五，上午 9:00 至下午 5:00',
    'bookme.info.one_hour': '• 每個時段為 1 小時的一對一諮詢',
    'bookme.info.confirmation': '• 預約成功後，您將收到確認郵件及日曆邀請',
    'bookme.info.cancel': '• 如需取消或更改預約，請提前 24 小時通知',
    'bookme.info.online': '• 諮詢可選擇線上會議或實體拜訪',
    'bookme.date.label': '📅 選擇日期',
    'bookme.date.required': '* 週六、週日不開放預約',
    'bookme.time.label': '⏰ 選擇時間 (1小時)',
    'bookme.time.select': '請先選擇日期',
    'bookme.time.loading': '載入中...',
    'bookme.time.no_slots': '此日期沒有可用的時間段。請選擇其他日期。',
    'bookme.time.hour': '* 每個時段為 1 小時的一對一諮詢',
    'bookme.selected.title': '已選擇：',
    'bookme.visitor.title': '👤 訪客資訊',
    'bookme.visitor.name': '您的姓名',
    'bookme.visitor.email': '電子郵件',
    'bookme.visitor.phone': '聯絡電話',
    'bookme.visitor.company': '公司名稱',
    'bookme.visitor.message': '諮詢內容 / 留言',
    'bookme.visitor.placeholder.name': '請輸入您的姓名',
    'bookme.visitor.placeholder.email': 'your@email.com',
    'bookme.visitor.placeholder.phone': '+852 1234 5678',
    'bookme.visitor.placeholder.company': '您的公司名稱',
    'bookme.visitor.placeholder.message': '請簡述您想諮詢的內容，例如：AI 整合方案、系統開發需求、企業培訓等...',
    'bookme.submit.processing': '處理中...',
    'bookme.submit.confirm': '確認預約',
    'bookme.modal.success.title': '預約成功',
    'bookme.modal.error.title': '預約失敗',

    // Vision Section
    'vision.title': '我們的願景',
    'vision.brand': 'InnovateXP Limited',
    'vision.tagline': 'Innovate • Transform • Experience',
    'vision.description': '在 InnovateXP，我們相信每一家企業都值得擁有 AI 和數據驅動的洞察力。我們不僅僅是開發軟件—我們是您競爭優勢的建築師。從活動管理到客戶關係，我們將複雜的挑戰轉化為優雅的解決方案，推動可衡量的增長。',
    'vision.innovate': '創新 Innovate',
    'vision.innovate_desc': '以 AI 驅動的解決方案挑戰現狀，將數據轉化為您的戰略資產。',
    'vision.transform': '轉型 Transform',
    'vision.transform_desc': '將您的業務運營從手動流程演變為智能自動化。',
    'vision.experience': '體驗 Experience',
    'vision.experience_desc': '提供超越預期的卓越成果，創造持久影響。',

    // Core Services Section (Three Main Services)
    'services.title': '我們的核心服務',
    'services.ai_crm.title': 'AI × CRM',
    'services.ai_crm.subtitle': '智能客戶管理系統',
    'services.ai_crm.benefit1': 'AI智能草稿提供專業快速回覆',
    'services.ai_crm.benefit2': '自動化預訂處理',
    'services.ai_crm.benefit3': '自動標記和跟進提醒消除遺漏訂單',
    'services.ai_crm.cta': '了解AI CRM解決方案',
    'services.checkin.title': 'EventXP 實時簽到系統',
    'services.checkin.subtitle': '簽到系統',
    'services.checkin.benefit1': '實時參與者列表',
    'services.checkin.benefit2': 'QR碼掃描',
    'services.checkin.benefit3': '自動統計',
    'services.checkin.cta': '了解簽到系統',
    'services.courses.title': 'AI 顧問服務',
    'services.courses.subtitle': '協助企業從 0 到 1 導入 AI',
    'services.courses.benefit1': '導入評估：大幅減少試錯成本',
    'services.courses.benefit2': '客製化 AI Agent 與架構設計',
    'services.courses.benefit3': '實戰 Prompt Engineering 培訓',
    'services.courses.cta': '了解顧問服務',
    
    // About Section
    'about.title': '關於我們',
    'about.intro.title': '關於 InnovateXP Limited',
    'about.intro.p1': '由 Larry Lo 創立（前 GDG HK Organiser，任期至 2025 年；2017-2019 HKSTP Incubatee）。我們不僅是你的IT顧問，更是實戰派的系統架構師。',
    'about.intro.p2': '我們的理念：「以熱誠、完美與卓越連結科技」。憑藉多年的系統設計 (System Design) 與實戰開發經驗，我們助您建立專屬的「沙漠綠洲」。',
    'about.intro.p3': '我們將創業公司的敏捷開發思維與企業級的穩定性完美結合，提供真正「可落地、可實施」的 AI 解決方案。',
    
    'about.tags.title': '我們的戰略與實力',
    'about.tags.red_ocean.title': '紅海困境',
    'about.tags.red_ocean.description': '高競爭、低利潤、同質化。若只做別人都在做的事，價值將被無限攤薄。你需要技術壁壘來突圍。',
    'about.tags.desert_oasis.title': '沙漠綠洲戰略',
    'about.tags.desert_oasis.description': '利用 AI 建立數據護城河。創造競爭對手無法輕易複製的獨特價值，建立屬於您的藍海綠洲。',
    'about.tags.community.title': '實戰驗證的技術力',
    'about.tags.community.description': '創始人擁有處理 2000+ 參與者規模的活動系統設計經驗。我們深知如何構建高併發、高穩定的系統，拒絕紙上談兵。',
    
    'about.story.title': '使命與 2026 路線圖',
    'about.story.content': 'InnovateXP 賦能企業，通過 AI 與系統藍圖實現業務升級。2026 部署：1月 (現在) - EventXP 發布；2月 - SmartSales CRM；3月 - AI 實戰手冊；4月 - 中小企 AI 課程。我們致力於技術落地。',

    // Partnership Section
    'partnership.title': '可信賴的合作夥伴與聯盟',
    'partnership.subtitle': '透過策略合作夥伴關係建立創新',
    'partnership.agilizing.title': '善敏教育中心',
    'partnership.agilizing.desc': '提供企業敏捷性與轉型的專業教育與培訓',
    'partnership.bni_anchor.title': 'BNI Anchor',
    'partnership.bni_anchor.desc': 'BNI 中的策略性商業引薦網絡與領導力發展',
    'partnership.linkedinlocal.title': 'LinkedInLocal Asia',
    'partnership.linkedinlocal.desc': '透過亞太地區的在地聯誼活動連結專業人士',
    
    // Contact Section
    'contact.title': '聯絡我們',
    'contact.subtitle': '請留下訊息，我們會盡快回覆您。',
    'contact.form.name': '姓名',
    'contact.form.email': '電郵地址',
    'contact.form.content': '內容',
    'contact.form.placeholder': '請填寫',
    'contact.form.submit': '發送電郵',
    'contact.form.success': '電郵已發送',
    
    // Story Section (3-Step)
    'story.title': '我們的策略',
    'story.step1.title': '紅海困境',
    'story.step1.description': '高競爭、低利潤、人人做同樣的事',
    'story.step2.title': '沙漠綠洲',
    'story.step2.description': '利用AI創造獨特價值，逃離競爭',
    'story.step3.title': '可樂理論',
    'story.step3.description': '相同產品，在不同環境中呈現不同價值',
    
    // Ideal Client Section
    'ideal.title': '理想引薦 / 理想客戶輪廓',
    'ideal.subtitle': '我們為中小企業解決的問題',
    'ideal.problem1': '太多WhatsApp查詢',
    'ideal.problem2': '漏單',
    'ideal.problem3': 'Excel混亂',
    'ideal.problem4': '缺乏CRM自動化',
    'ideal.value': '為中小企業明確的價值主張',
    
    // Founder Section
    'founder.title': '創辦人與資歷',
    'founder.name': 'Larry Lo',
    'founder.credential1': 'SAFe認證',
    'founder.credential2': 'Google Developer Group 講者',
    'founder.credential3': '200+開發者培訓經驗',
    'founder.credential4': 'HKSTP孵化',
    'founder.credential5': 'JCI/BNI領導',
    
    // Achievements Section
    'achievements.title': '實績與影響',
    'achievements.kmb': 'KMB / 政府專案',
    'achievements.government': '高風險環境系統',
    'achievements.sme': '中小企業專案',
    'achievements.engagement': '提升用戶參與度達100%',
    'achievements.case': 'AI × CRM成功案例',
    
    // Credibility Badges
    'credibility.title': '合作夥伴與認可',
    'credibility.gdg': 'GDG Hong Kong',
    'credibility.hku': 'HKU',
    'credibility.hkstp': 'HKSTP',
    'credibility.jci': 'JCI',
    'credibility.bni': 'BNI',
    
    // Product Showcases
    'showcase.title': '解決方案展示',
    'showcase.problem_label': '遇到的問題：',
    'showcase.solution_label': '我們的解決方案：',
    'showcase.features_label': '核心功能：',
    'showcase.screenshot_coming': '產品截圖即將推出',
    'showcase.checkin.title': 'EventXP',
    'showcase.checkin.subtitle': 'QR Code + 即時同步',
    'showcase.checkin.problem': '手動簽到容易出錯、遺漏數據，會後統計費時費力',
    'showcase.checkin.solution': 'QR Code 掃描簽到，即時同步到 Notion 資料庫，會長隨時查閱出席率與統計報表',
    'showcase.checkin.features': 'QR Code 快速簽到; 自動統計報表; 實時參加者名單; 支援多場次活動',
    'showcase.checkin.cta': '預約了解簽到系統',
    'showcase.booking.title': '預約 / 預訂系統',
    'showcase.booking.subtitle': 'Notion Calendar + Email + WhatsApp 通知',
    'showcase.booking.problem': 'WhatsApp 反覆確認時間，日曆散亂，容易撞期或遺漏',
    'showcase.booking.solution': '客戶自選時段，系統自動檢查空檔，確認後即刻加入 Notion Calendar，並發送 .ics 行事曆附件與 WhatsApp 確認',
    'showcase.booking.features': '可視化日曆選擇; 即時空檔檢查; Notion Calendar 同步; Email 自動寄送 .ics 附件',
    'showcase.booking.cta': '預約了解預訂系統',
    'showcase.ai_crm.title': 'AI × CRM',
    'showcase.ai_crm.subtitle': '智能客戶關係管理系統',
    'showcase.ai_crm.problem': 'WhatsApp 訊息散落，靠人工記錄容易錯漏，無法系統化追蹤客戶狀態與銷售進度',
    'showcase.ai_crm.solution': '整合 AI 自動標記、草擬回覆、提醒跟進，將客戶資訊集中管理，銷售漏斗一目了然',
    'showcase.ai_crm.feature1': 'AI 智能草稿 - 快速生成專業回覆',
    'showcase.ai_crm.feature2': '自動標記 - 客戶狀態自動分類',
    'showcase.ai_crm.feature3': '跟進提醒 - 消除遺漏訂單',
    'showcase.ai_crm.feature4': '銷售漏斗 - 可視化管理客戶旅程',
    'showcase.ai_crm.cta': '預約了解AI CRM',
    'ideal.cta': '立即預約諮詢',
    
    // Pricing Section
    'pricing.title': '產品定價方案',
    'pricing.subtitle': '數據變現 + 社群留存 = 長遠增長',
    'pricing.promotion': 'Q1 推出優惠',
    'pricing.promotion_detail': '簽約一年，免費贈送 1 場 Man-day 客製化諮詢',
    
    // EventXP Product
    'pricing.insight.name': 'EventXP',
    'pricing.insight.tagline': '將活動數據轉化為營收增長',
    'pricing.insight.subtitle': '智能活動數據系統',
    'pricing.insight.description': '別讓您的訪客數據在 Excel 裡沉睡。將出席記錄升級為深度客戶洞察，創造可持續的業績增長。',
    'pricing.insight.value': '預測參加者興趣，留住社群成員，精準鎖定明年買家。',
    
    'pricing.insight.tier1.name': 'Professional',
    'pricing.insight.tier1.price': 'HKD $2,480',
    'pricing.insight.tier1.period': '/ 月',
    'pricing.insight.tier1.target': '頻繁舉辦小型活動的機構（培訓中心 / 學會）',
    'pricing.insight.tier1.feature1': '無限場次活動建立',
    'pricing.insight.tier1.feature2': 'QR Code 簽到系統',
    'pricing.insight.tier1.feature3': 'Real-time 實時出席報表',
    'pricing.insight.tier1.feature4': '自動化 Monthly Report（CSV）',
    
    'pricing.insight.tier2.name': 'AI Growth',
    'pricing.insight.tier2.price': 'HKD $2,880',
    'pricing.insight.tier2.period': '/ 月',
    'pricing.insight.tier2.subtitle': '(僅需比標準版多付 $400)',
    'pricing.insight.tier2.badge': '超值推薦',
    'pricing.insight.tier2.target': '專為重視數據回報（ROI）與社群留存（Retention）的企業打造',
    'pricing.insight.tier2.feature1': '包含 Professional 所有功能，並解鎖 AI 增長引擎：',
    'pricing.insight.tier2.feature2': '🕵️ AI 潛在興趣透視：不再猜測訪客喜歡什麼。AI 分析簽到行為，精準預測每位參加者的潛在興趣。',
    'pricing.insight.tier2.feature3': '🧲 舊客留存策略引擎：獲客成本（CAC）越來越高？AI 自動建議下一季活動主題，精準擊中舊客痛點，讓他們主動回流。',
    'pricing.insight.tier2.feature4': '🎯 精準轉化名單：活動結束即行銷開始。一鍵生成「高潛力回購名單」，針對明年的活動自動圈選最可能買單的 Target Audience。',
    'pricing.insight.tier2.note': '💡 為什麼選擇此方案？「聘請一位數據分析師月薪要 2 萬，但 EventXP AI 僅需 $400。」別再把預算浪費在盲目廣告上。用一張單人午餐的價錢，換取 AI 幫您找出誰才是您的下一個金主。',
    
    'pricing.insight.tier3.name': 'Enterprise',
    'pricing.insight.tier3.price': '另議',
    'pricing.insight.tier3.period': '(Man-day 計費)',
    'pricing.insight.tier3.target': '大型峰會 / 特殊流程需求',
    'pricing.insight.tier3.feature1': '客製化報名流程（Custom Logic）',
    'pricing.insight.tier3.feature2': 'API 對接（CRM/ERP）',
    'pricing.insight.tier3.feature3': '現場技術支援（On-site Support）',
    
    // SmartSales CRM Product
    'pricing.crm.name': 'SmartSales CRM',
    'pricing.crm.tagline': '用 AI 複製您的金牌業務員',
    'pricing.crm.subtitle': 'AI 銷售增長引擎',
    'pricing.crm.description': '讓 AI 成為你的頂級銷售助理。從寫信、排程到分析，自動化繁瑣工作，讓你專注於成交。',
    'pricing.crm.value': '自動化跟進、預約與分析，節省 70% 行政時間。',
    
    'pricing.crm.feature1.title': 'AI 智能寫作與回覆',
    'pricing.crm.feature1.desc': '情境感知回覆：當客戶說「太貴了」，AI 自動草擬一封強調「價值與 ROI」的回信供 Sales 修改。',
    'pricing.crm.feature2.title': '智能排程',
    'pricing.crm.feature2.desc': '自動預約：整合 Google/Outlook Calendar，AI 機器人可以直接在對話中與客戶確認空檔，並發送會議邀請。',
    'pricing.crm.feature3.title': '洞察報告',
    'pricing.crm.feature3.desc': '銷售預測：AI 分析目前的 Pipeline，預測本月營收達標率。',
    
    'pricing.crm.tier1.name': 'Starter',
    'pricing.crm.tier1.price': 'HKD $2,800',
    'pricing.crm.tier1.period': '/ 月',
    'pricing.crm.tier1.target': '輕量版',
    'pricing.crm.tier1.feature1': '基礎 CRM 功能（客戶資料庫）',
    'pricing.crm.tier1.feature2': '基礎 AI 寫作（Email Draft）',
    'pricing.crm.tier1.feature3': '標準銷售報表',
    
    'pricing.crm.tier2.name': 'Pro',
    'pricing.crm.tier2.price': 'HKD $4,800',
    'pricing.crm.tier2.period': '/ 月',
    'pricing.crm.tier2.badge': '全功能 AI',
    'pricing.crm.tier2.target': '全功能 AI 版',
    'pricing.crm.tier2.feature1': '進階 AI 功能：自動回覆建議、智能排程、流失預警',
    'pricing.crm.tier2.feature2': 'Insight Report：AI 銷售預測與戰略建議',
    'pricing.crm.tier2.feature3': 'WhatsApp / Email 雙向整合',
    
    'pricing.crm.tier3.name': 'Setup 費用',
    'pricing.crm.tier3.price': 'HKD $15,000 起',
    'pricing.crm.tier3.period': '(一次性)',
    'pricing.crm.tier3.target': '系統導入',
    'pricing.crm.tier3.feature1': '協助將舊數據導入',
    'pricing.crm.tier3.feature2': '根據公司產品訓練專屬 AI Prompt',
    'pricing.crm.tier3.feature3': '員工培訓工作坊',
    
    'pricing.cta': '預約諮詢',
    'pricing.contact': '聯絡了解詳情',
    
    // Roadmap Section
    'roadmap.title': '2026路線圖',
    'roadmap.jan': '1月 - 簽到系統發布',
    'roadmap.feb': '2月 - AI客戶管理系統',
    'roadmap.mar': '3月 - AI實用手冊',
    'roadmap.apr': '4月 - 中小企AI實用課程',
    
    // Newsletter Section
    'newsletter.title': '保持聯繫',
    'newsletter.subtitle': '訂閱我們的電子報，獲取最新的 AI 洞察和更新',
    'newsletter.name': '您的姓名',
    'newsletter.email': '您的電郵',
    'newsletter.interests': '興趣',
    'newsletter.interest.ai': 'AI',
    'newsletter.interest.tech': '科技',
    'newsletter.interest.crm': 'CRM',
    'newsletter.interest.events': '活動',
    'newsletter.subscribe': '訂閱',
    'newsletter.success': '訂閱成功！感謝您的加入。',
    'newsletter.error': '訂閱失敗，請重試。',
    
    // AI Consulting Section
    'ai_consulting.title': 'AI 顧問服務',
    'ai_consulting.subtitle': '從策略到落地實施',
    'ai_consulting.description': '我們以實戰為導向的顧問服務，協助企業探索 AI 應用之路。',
    'ai_consulting.package1.name': 'AI 導入評估',
    'ai_consulting.package1.price': 'HKD $8,000 起',
    'ai_consulting.package1.desc': '全面評估您的組織 AI 準備程度與機會',
    'ai_consulting.package1.feature1': '現狀分析',
    'ai_consulting.package1.feature2': 'AI 機會識別',
    'ai_consulting.package1.feature3': '實施路線圖',
    'ai_consulting.package2.name': '客製化 AI Agent',
    'ai_consulting.package2.price': 'HKD $25,000 起',
    'ai_consulting.package2.desc': '為您的業務需求量身打造的 AI 代理',
    'ai_consulting.package2.feature1': '客製化工作流程設計',
    'ai_consulting.package2.feature2': '與現有系統整合',
    'ai_consulting.package2.feature3': '持續支援與優化',
    'ai_consulting.package3.name': 'Prompt 實戰訓練營',
    'ai_consulting.package3.price': 'HKD $12,000 起',
    'ai_consulting.package3.desc': '實戰培訓，讓您的團隊掌握 AI 提示工程',
    'ai_consulting.package3.feature1': '互動式工作坊',
    'ai_consulting.package3.feature2': '真實案例研究',
    'ai_consulting.package3.feature3': '客製化提示庫',
    
    // Navigation
    'nav.home': '首頁',
    'nav.eventxp': 'EventXP',
    'nav.smartsales': 'SmartSales CRM',
    'nav.ai_consulting': 'AI 顧問',
    'nav.vision': '願景',
    'nav.partnership': '合作夥伴',
    
    // Footer
    'footer.copyright': `© ${new Date().getFullYear()} InnovateXP Limited. 版權所有。`,
    
    // FAQ Sections
    'faq.smartsales.title': 'SmartSales CRM - 常見問題',
    'faq.smartsales.q1': '什麼是 AI CRM？它與傳統 CRM 有何不同？',
    'faq.smartsales.a1': 'AI CRM 是結合人工智能的客戶關係管理軟件。與僅儲存數據的傳統 CRM 不同，AI CRM 能自動草擬跟進訊息、預測哪些潛在客戶會轉化，並根據行為模式優先處理潛在客戶。它能為中小企業每天節省 3 小時以上的重複性銷售工作。',
    'faq.smartsales.q2': 'AI CRM 能否與 WhatsApp 整合以服務香港企業？',
    'faq.smartsales.a2': '可以。SmartSales CRM 直接與 WhatsApp Business API 整合，讓香港企業接收查詢、自動草擬中文或英文回覆，並追蹤對話歷史——全部在一個平台上完成。發送前需要人工審批。',
    'faq.smartsales.q3': '在香港使用 AI CRM 需要多少費用？',
    'faq.smartsales.a3': 'SmartSales CRM Starter 計劃月費由 HKD 2,800 起，Pro 全功能 AI 計劃月費 HKD 4,800。企業定價取決於用戶數量和整合需求。請聯絡我們獲取定制報價。',
    'faq.smartsales.q4': '實施 AI CRM 需要多長時間？',
    'faq.smartsales.a4': '基本設置需要 1-2 週，包括數據遷移和團隊培訓。完整的 WhatsApp 整合和定制工作流程通常需要 3-4 週。我們全程提供實戰導入支援。',
    'faq.smartsales.q5': 'AI 驅動的客戶管理能帶來什麼投資回報？',
    'faq.smartsales.a5': '客戶通常在第一個月內看到：遺漏跟進減少 70%、每天節省 3+ 小時手動工作、潛在客戶回應時間改善 40%。',
    
    'faq.eventxp.title': 'EventXP - 常見問題',
    'faq.eventxp.q1': '什麼是 EventXP 活動簽到系統？',
    'faq.eventxp.a1': 'EventXP 是一個活動情報平台，將簽到轉化為商業洞察。除了出席追蹤，它還能預測哪些參加者最有可能購買、續會或需要跟進——將活動數據轉化為可操作的銷售線索。',
    'faq.eventxp.q2': 'QR 碼簽到如何運作？',
    'faq.eventxp.a2': '賓客通過電郵或 WhatsApp 收到獨特的 QR 碼。在活動現場，工作人員使用 EventXP 手機應用掃描 QR 碼。系統即時記錄出席、將賓客資料與您的 CRM 配對，並可在活動後觸發自動跟進。',
    'faq.eventxp.q3': 'EventXP 能否處理多個同時進行的活動？',
    'faq.eventxp.a3': '可以。EventXP 支援無限數量的同步活動，配備獨立儀表板、即時出席追蹤，並可整合所有活動的報告。',
    'faq.eventxp.q4': 'EventXP 活動管理系統的費用是多少？',
    'faq.eventxp.a4': 'EventXP Professional 月費由 HKD 2,480 起，包括無限場次活動建立和 QR 碼簽到。AI Growth 計劃月費 HKD 2,880，包括 AI 驅動的參加者興趣預測和留存策略。',
    
    'faq.aiconsulting.title': 'AI 顧問服務 - 常見問題',
    'faq.aiconsulting.q1': '什麼是 Prompt Engineering 培訓？',
    'faq.aiconsulting.a1': 'Prompt Engineering 培訓教導您的團隊如何有效地與 AI 系統（如 ChatGPT、Claude 或定制 AI 代理）溝通。我們的實戰訓練營涵蓋提示結構、上下文優化、輸出精煉，以及針對您行業的真實商業應用。',
    'faq.aiconsulting.q2': '你們如何評估中小企業的 AI 準備度？',
    'faq.aiconsulting.a2': '我們的 AI 準備度評估（HKD 8,000 起）分析您目前的工作流程、數據基礎設施、團隊能力和業務目標。我們識別高回報的 AI 機會、評估技術需求，並提供針對您預算和資源的分階段實施路線圖。',
    'faq.aiconsulting.q3': '你們為哪些行業提供 AI 顧問服務？',
    'faq.aiconsulting.a3': '我們專注為服務型中小企業提供 AI 解決方案，包括教育中心、活動組織者、專業服務、培訓機構和香港的 B2B 公司。我們的創辦人擁有 14 年科技經驗，曾管理 2,000+ 參與者規模的系統。',
    'faq.aiconsulting.q4': '定制 AI 代理開發需要多長時間？',
    'faq.aiconsulting.a4': '定制 AI 代理項目從需求收集到部署通常需要 4-8 週。這包括工作流程設計、與現有系統整合、測試和員工培訓。定價由 HKD 25,000 起。',
    
    // Answer-first content sections
    'eventxp.what.title': '什麼是 EventXP 活動簽到系統？',
    'eventxp.what.answer': 'EventXP 是一個活動情報平台，將簽到轉化為商業洞察。除了出席追蹤，它使用 AI 預測哪些參加者最有可能購買、續會或需要跟進——將活動數據轉化為可操作的銷售線索，專為香港活動組織者設計。',
    'eventxp.how.title': 'QR 碼簽到如何運作？',
    'eventxp.how.step1': '賓客通過電郵或 WhatsApp 收到獨特的 QR 碼',
    'eventxp.how.step2': '工作人員在活動現場使用 EventXP 手機應用掃描 QR 碼',
    'eventxp.how.step3': '系統即時記錄出席並配對賓客資料',
    'eventxp.how.step4': '活動後根據行為自動觸發跟進',
    
    'aicrm.what.title': '什麼是 AI CRM？',
    'aicrm.what.answer': 'AI CRM 是結合人工智能的客戶關係管理軟件，能自動草擬跟進訊息、預測潛在客戶轉化，並優先處理潛在客戶。與僅儲存數據的傳統 CRM 不同，AI CRM 透過智能自動化，為中小企業每天節省 3 小時以上的重複性銷售工作。',
    'aicrm.benefits.title': '香港中小企業使用 AI CRM 的 5 大好處：',
    'aicrm.benefits.1': '自動化跟進減少 70% 遺漏機會',
    'aicrm.benefits.2': '智能排程消除重複預約，每天節省 3+ 小時',
    'aicrm.benefits.3': 'AI 驅動回覆提升 40% 潛在客戶回應時間',
    'aicrm.benefits.4': '85% 準確度的銷售預測，助您更好規劃',
    'aicrm.benefits.5': '專為香港商業通訊定制的 WhatsApp 整合',
    'aicrm.pricing.title': '香港 AI CRM 定價比較',
    'aicrm.pricing.plan': '計劃',
    'aicrm.pricing.price': '價格 (HKD/月)',
    'aicrm.pricing.bestfor': '最適合',
    'aicrm.pricing.features': '主要功能',
    'aicrm.pricing.starter': 'Starter',
    'aicrm.pricing.starter.price': '$2,800',
    'aicrm.pricing.starter.for': '小型團隊',
    'aicrm.pricing.starter.features': '基礎 CRM + AI 電郵草稿',
    'aicrm.pricing.pro': 'Pro ⭐',
    'aicrm.pricing.pro.price': '$4,800',
    'aicrm.pricing.pro.for': '成長型企業',
    'aicrm.pricing.pro.features': '全功能 AI + WhatsApp + 預測',
    'aicrm.pricing.setup': 'Setup 費用',
    'aicrm.pricing.setup.price': '$15,000+',
    'aicrm.pricing.setup.for': '一次性',
    'aicrm.pricing.setup.features': '數據遷移 + 培訓',
    
    'aiconsulting.what.title': '我們提供哪些 AI 顧問服務？',
    'aiconsulting.what.answer': 'InnovateXP 為香港中小企業提供三項核心 AI 顧問服務：AI 準備度評估（HKD 8,000 起）評估您的實施機會、定制 AI 代理構建（HKD 25,000 起）提供量身定制的 AI 解決方案，以及 Prompt Engineering 培訓（HKD 12,000 起）提供實戰團隊技能發展。',
    'aiconsulting.who.title': '誰需要 AI 實施顧問？',
    'aiconsulting.who.intro': 'AI 顧問服務最適合以下香港中小企業：',
    'aiconsulting.who.1': '想採用 AI 但不知從何開始',
    'aiconsulting.who.2': '需要減少 AI 實施的試錯成本',
    'aiconsulting.who.3': '需要針對特定業務工作流程的定制 AI 代理',
    'aiconsulting.who.4': '希望團隊接受實用的 Prompt Engineering 培訓',
    'aiconsulting.who.5': '尋求 14 年科技老兵的專業指導',
    
    'about.author.byline': '作者：',
    'about.author.title': 'InnovateXP 創辦人 | 14 年科技老兵 | AI 顧問 | 前 GDG Hong Kong Organizer',
    'about.author.updated': '最後更新：',
    'about.credentials.title': '資歷與聯盟',
    'about.credentials.experience': '科技經驗',
    'about.credentials.participants': '活動參與者',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
