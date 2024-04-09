import PageSidebar from '@/components/pageSidebar';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="">
      <div className="h-full lg:block hidden mt-20 fixed lg:overflow-y-hidden ">
        <PageSidebar />
      </div>
      <div className="lg:pl-64 pt-20">{children}</div>
    </div>
  );
}

export default Layout;
