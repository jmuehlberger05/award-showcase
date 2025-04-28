"use client";

import { useState, useEffect } from "react";

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

export function useFetch<T = any>(url: string) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(url, {
          cache: "no-store",
          next: { revalidate: 0 },
        });

        if (!res.ok) {
          throw new Error(`JSON fetch failed: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        if (!isCancelled) {
          setState({ data, error: null, loading: false });
        }
      } catch (err) {
        if (!isCancelled) {
          setState({ data: null, error: err as Error, loading: false });
        }
      }
    }

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [url]);

  if (state.error) {
    // ✨ Automatically throw to trigger ErrorBoundary
    throw state.error;
  }

  return {
    data: state.data,
    loading: state.loading,
  };
}
