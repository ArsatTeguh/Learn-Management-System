import React from 'react';
import Script from 'next/script';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="">{children}</div>
      <Script
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        async
      />
    </>
  );
}

export default Layout;
