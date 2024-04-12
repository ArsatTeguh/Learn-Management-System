import React from 'react';
import { cookies } from 'next/headers';
import dynamic from 'next/dynamic';

const DynamicNavbar = dynamic(() => import('./navbar'), {
  ssr: false,
});

async function PageNavbar() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/course/course-list/${token}`,
  );
  const req = await res.json();
  return <DynamicNavbar list={req?.data} token={token || ''} />;
}

export default PageNavbar;
