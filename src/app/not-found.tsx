import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fffcf7] dark:bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">Page not found</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          This page does not exist or may have been moved. The rest of the site is working normally.
        </p>
        <nav className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-primary px-6 font-bold text-white transition duration-300 hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            Home
          </Link>
          <Link
            href="/bookme#quotation-wizard"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-gray-300 bg-white px-6 font-bold text-gray-900 transition duration-300 hover:border-brand-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-[#00B9B3]"
          >
            Contact us
          </Link>
          <Link
            href="/bookme"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-gray-300 bg-white px-6 font-bold text-gray-900 transition duration-300 hover:border-brand-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-[#00B9B3]"
          >
            Book a call
          </Link>
          <Link
            href="/ai-consulting"
            className="inline-flex min-h-[44px] items-center justify-center px-6 font-semibold text-brand-primary hover:underline dark:text-teal-300"
          >
            AI Consulting
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-[44px] items-center justify-center px-6 font-semibold text-brand-primary hover:underline dark:text-teal-300"
          >
            Blog
          </Link>
        </nav>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          If you followed a broken link, you can{" "}
          <a href="mailto:info@innovatexp.com?subject=Broken%20link%20report" className="text-brand-primary hover:underline dark:text-teal-300">
            report it to us
          </a>
          .
        </p>
      </div>
    </main>
  );
}
