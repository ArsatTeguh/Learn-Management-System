import { cookies } from 'next/headers';
import React from 'react';
import dynamic from 'next/dynamic';
import Loadingsidebar from '@/lib/loadingsidebar';

const DynamicSidebar = dynamic(() => import('./sidebar'), {
  ssr: false,
  loading: () => <div><Loadingsidebar /></div>,
});

async function PageSidebar() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/course/course-list/${token}`);
  const req = await res.json();
  return <DynamicSidebar list={req.data} />;
}

export default PageSidebar;
