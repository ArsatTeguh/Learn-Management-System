import React from 'react';
import { cookies } from 'next/headers';
import Navbar from './navbar';

async function PageNavbar() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const apiUrl = process.env.API_URL;
  const res = await fetch(
    `${apiUrl}/api/course/course-list/${token}`,
  );
  const req = await res.json();
  return <Navbar list={req.data} token={token || ''} />;
}

export default PageNavbar;
