"use client";

import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error(error);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [error]);

  useEffect(() => {
    if (countdown <= 0) {
      reset();
    }
  }, [countdown, reset]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="p-8 bg-white rounded-xl shadow-xl text-center border border-slate-100">
        <h2 className="text-red-500 text-4xl font-semibold mb-4">
          Something went wrong!
        </h2>
        <pre className="text-gray-700 mb-4 text-lg">
          Error - {error.message}
        </pre>
        <button
          className="text-lg mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          onClick={reset}
        >
          Try again ({countdown})
        </button>
      </div>
    </main>
  );
}
