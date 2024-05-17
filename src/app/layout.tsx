import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import CustomProvider from '@/state/customeProvider';
import PageNavbar from '@/components/pageNavbar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Learn Magement System',
  description:
    'website for students to start the newest and most complete lessons.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={poppins.className}>
        <CustomProvider>
          <div className="w-screen !z-30 fixed h-20 bg-white overflow-x-hidden ">
            <Suspense fallback="">
              <PageNavbar />
              {/* <Navbar /> */}
            </Suspense>
          </div>
          {/* letakan CustomProvider disini jika ingin menggunakan redux-toolkit */}
          {children}
        </CustomProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
