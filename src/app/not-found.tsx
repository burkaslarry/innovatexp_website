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
            className="inline-flex items-center justify-center min-h-[44px] px-6 bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold rounded-full transition duration-300"
          >
            Home
          </Link>
          <Link
            href="/#contact-us"
            className="inline-flex items-center justify-center min-h-[44px] px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 transition duration-300"
          >
            Contact us
          </Link>
          <Link
            href="/bookme"
            className="inline-flex items-center justify-center min-h-[44px] px-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-full border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 transition duration-300"
          >
            Book a call
          </Link>
          <Link
            href="/ai-consulting"
            className="inline-flex items-center justify-center min-h-[44px] px-6 text-orange-600 dark:text-orange-400 font-semibold hover:underline"
          >
            AI Consulting
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center min-h-[44px] px-6 text-orange-600 dark:text-orange-400 font-semibold hover:underline"
          >
            Blog
          </Link>
        </nav>
        <p className="mt-8 text-sm text-gray-400 dark:text-gray-500">
          If you followed a broken link, you can{" "}
          <a href="mailto:info@innovatexp.com?subject=Broken%20link%20report" className="text-orange-600 dark:text-orange-400 hover:underline">
            report it to us
          </a>
          .
        </p>
      </div>
    </main>
  );
}
