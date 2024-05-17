'use client';

import { isAnyValueEmpty } from '@/lib/isEmptyCourse';
import { RootState } from '@/state/store';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DispatchModal from '@/lib/dispatchModal';
import { GrChapterAdd } from 'react-icons/gr';
import { FaRegCompass } from 'react-icons/fa6';
import { FiGift } from 'react-icons/fi';
import { TbBrandDiscord } from 'react-icons/tb';
import { MdCode } from 'react-icons/md';
import ItemSidebar from './itemSidebar';

const iconTeacher = [
  <GrChapterAdd />,
  <FaRegCompass />,
  <FiGift />,
  <TbBrandDiscord />,
  <MdCode />,
];
const iconDefault = [
  <FaRegCompass />,
  <FiGift />,
  <TbBrandDiscord />,
  <MdCode />,
];

interface ListProps {
  title: string;
  href: string;
  role: string;
}

function Sidebar({ list } : { list: ListProps[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useSelector((state: RootState) => state.user);
  const course = useSelector((state: RootState) => state.course);
  const { onModal, modal } = DispatchModal();

  const onNavigate = (url: string) => {
    const validateCourseForm = isAnyValueEmpty(course);
    if (validateCourseForm && pathname === `/add-course/${user?.userId}`) {
      onModal(true, url);
    } else {
      onModal(false, '');
      router.push(url);
    }
  };

  useEffect(() => {
    if (pathname === '/' && user?.userId !== '') {
      const newPath = `/${user.userId}`;
      router.replace(newPath);
    } else if (pathname === '/' && user?.userId === '') {
      router.replace('/');
    }
  }, [user.userId, router, pathname]);

  useEffect(() => {
    if (modal.isModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modal.isModal]);

  return (
    <div className=" h-full relative ">
      <div className="h-screen overflow-y-hidden bg-white border-r-[1px] w-64">
        <div className="flex flex-col gap-2 px-3 pt-4">
          {list?.map((item, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <ItemSidebar
              pathname={pathname}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...item}
              icon={user?.role === 'teacher' ? iconTeacher[index] : iconDefault[index]}
              navigate={onNavigate}
            />
          ))}
        </div>
        <div className=" rounded  mt-4 w-full  absolute bottom-[11rem]  lg:bottom-[8rem]">
          <div className=" flex flex-col w-[92%] mx-auto gap-2  p-4 bg-white rounded border">
            <p className="font-medium">Upgrade to Pro</p>
            <p className="text-[13px] text-zinc-600"> Unlock weekly workshops, access to all paid content, and more.</p>
            <button type="submit" className="bg-slate-800 text-sm rounded mt-2 text-white font-medium px-6 py-2">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
