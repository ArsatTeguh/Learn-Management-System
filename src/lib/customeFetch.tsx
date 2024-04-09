'use client';

import { useRouter } from 'next/navigation';

export default function CustomeFetch() {
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
    const response = await fetch(`process.env.NEXT_PUBLIC_API_URL/${url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (response.status === 401) {
      router.push('/auth/signin');
    }
    return response;
  };

  return { Fetch };
}
