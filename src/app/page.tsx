import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 font-sans">
      <h1 className="mb-6 text-2xl font-bold">OpenNext ISR Test</h1>

      <h2 className="mt-6 mb-2 text-lg font-semibold text-gray-700">
        Time-based Revalidation (Legacy)
      </h2>
      <ul className="mb-8 list-disc space-y-2 pl-5">
        <li>
          <Link href="/revalidate-page" className="text-blue-600 hover:underline">
            Page Level ISR (revalidate = 60)
          </Link>
        </li>
        <li>
          <Link href="/revalidate-fetch-external" className="text-blue-600 hover:underline">
            Fetch Level ISR - External API
          </Link>
        </li>
        <li>
          <Link href="/revalidate-fetch-internal" className="text-blue-600 hover:underline">
            Fetch Level ISR - Internal API
          </Link>
        </li>
      </ul>

      <h2 className="mt-6 mb-2 text-lg font-semibold text-gray-700">
        On-Demand Revalidation (Tag-based)
      </h2>
      <ul className="mb-8 list-disc space-y-2 pl-5">
        <li>
          <Link href="/revalidate-fetch-external-tag" className="text-purple-600 hover:underline">
            Fetch Level ISR (Tag) - External API & Pagination
          </Link>
        </li>
        <li>
          <Link href="/revalidate-fetch-internal-tag" className="text-purple-600 hover:underline">
            Fetch Level ISR (Tag) - Internal API
          </Link>
        </li>
      </ul>

      <h2 className="mt-6 mb-2 text-lg font-semibold text-gray-700">Other Features</h2>
      <ul className="list-disc space-y-2 pl-5">
        <li>
          <Link href="/sentry-test" className="font-bold text-red-600 hover:underline">
            Sentry Integration Test Suite (Error & Trace)
          </Link>
        </li>
        <li>
          <Link href="/image-test" className="text-green-600 hover:underline">
            Cloudflare Image Optimization Test
          </Link>
        </li>
      </ul>
    </div>
  );
}
