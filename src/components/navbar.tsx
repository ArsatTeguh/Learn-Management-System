'use client';

import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-cycle
import { getToken } from '@/lib/client-token';
import { RootState } from '@/state/store';
import { setUser } from '@/state/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiSignOut } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './sidebar';
import Search from './search';

export type UserProps = {
  profile: string;
  role: string;
  email: string;
};

function Navbar({ token, list }: { token: string; list: any }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const information = getToken({ token });
    dispatch(setUser(information as UserProps));
    return () => {};
  }, [dispatch, token]);

  const router = useRouter();
  return (
    <div className="w-full border-b-[1px] h-full  bg-white z-10 ">
      <div className="flex w-full justify-between lg:px-8 px-4 h-full items-center">
        <div className=" items-center gap-2 hidden md:flex ">
          <Image alt="logo" src="/logo.svg" width={150} height={150} />
        </div>
        <div className="drawer block lg:hidden">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
          <label
            htmlFor="my-drawer"
            className="text-2xl cursor-pointer block lg:hidden"
          >
            <GiHamburgerMenu />
          </label>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-side">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control  */}
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            />
            <Sidebar list={list} />
          </div>
        </div>
        <div className="w-[45%] hidden md:block h-full ">
          <Search userId={user.userId} />
        </div>
        {token ? (
          <div className="items-center gap-2 px-2 flex ">
            <div className="flex items-center gap-3">
              <Image
                src={user?.profile ?? ''}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full border-[1px]"
              />
              <div className="hidden lg:block">
                <p className="font-medium text-sm text-sky-blue-500">
                  {' '}
                  {user?.email}{' '}
                </p>
                <p className="font-medium text-sm text-sky-blue-500 text-zinc-500">
                  {' '}
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="items-center gap-2 flex ">
            <button
              onClick={() => router.push('/auth/signin')}
              type="button"
              className=" px-6 py-2 hover:bg-sky-200/15 bg-white border rounded-md flex items-center gap-2"
            >
              <span className="text-xl">
                <PiSignOut />
              </span>
              Demo
            </button>
            {/* <button
              onClick={() => router.push('/auth/register')}
              type="button"
              className=" px-6 py-2 hover:bg-sky-500/15 bg-sky-500 text-white border
              rounded-md flex items-center gap-2 hover:bg-sky-600"
            >
              Register
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
