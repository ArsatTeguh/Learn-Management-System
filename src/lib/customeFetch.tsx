'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CustomeFetch() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const Fetch = async ({
    url,
    method,
    body,
  }: {
    url: string;
    method: string;
    body: Object;
  }) => {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    setLoading(false);
    if (response.status === 401) {
      router.push('/auth/signin');
    }
    return response;
  };

  return { Fetch, loading };
}
