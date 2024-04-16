'use client';

import React, { useCallback, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Tabs from './tabs';

function Course() {
  const [params, setParams] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback((name: string, value: string) => {
    // eslint-disable-next-line prefer-const, @typescript-eslint/no-shadow
    let params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    setParams(value);
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  return <Tabs params={params} createQueryString={createQueryString} />;
}

export default Course;
