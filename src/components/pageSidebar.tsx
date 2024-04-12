import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicSidebar = dynamic(() => import('./sidebar'), {
  ssr: false,
});

async function PageSidebar() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/course/course-list/${token}`,
  );
  const req = await res.json();
  return (
    <Suspense fallback="">
      <DynamicSidebar list={req.data} />
    </Suspense>
  );
}

export default PageSidebar;
