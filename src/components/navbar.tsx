'use client';

import React, { useEffect, useState } from 'react';
// eslint-disable-next-line import/no-cycle
import { getToken } from '@/lib/client-token';
import { RootState } from '@/state/store';
import { setUser } from '@/state/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiHamburgerMenu } from 'react-icons/gi';
import { PiSignOut } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import DispatchTransaction from '@/lib/dispatchTrasanction';
import { initialState, PropsTransaction } from '@/state/transaction';
import Toast from '@/lib/toast';
import Sidebar from './sidebar';
import Search from './search';
import ModalNavbar from './modalNavbar';

export type UserProps = {
  profile: string;
  role: string;
  email: string;
};

function Navbar({ token, list }: { token: string; list: any }) {
  const [onModal, setModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { transaction, onTransaction } = DispatchTransaction();

  const onActionModal = async (action: 'done' | 'close') => {
    if (action === 'done') {
      const [courseId, userId] = transaction.transaction.order_id.split('@');
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/chapter/existBuyer/${courseId}/${userId}`,
        { cache: 'force-cache' },
      );
      if (!response.ok) {
        Toast({
          status: 'error',
          message: 'Transaction Pending',
        });
      } else {
        Toast({
          status: 'success',
          message: 'Transaction Success',
        });
        localStorage.setItem(`selectedPaymentMethod/${user.userId}`, JSON.stringify(''));
        onTransaction(initialState);
        setModal(false);
      }
    } else {
      setModal(false);
    }
  };

  useEffect(() => {
    const information = getToken({ token });
    dispatch(setUser(information as UserProps));
    return () => {};
  }, [dispatch, token]);

  useEffect(() => {
    const savedPaymentMethod = localStorage.getItem(`selectedPaymentMethod/${user.userId}`);
    if (savedPaymentMethod) {
      const format:PropsTransaction = JSON.parse(savedPaymentMethod);
      onTransaction(format);
    }
  }, [onTransaction, user.userId]);

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
            {transaction.transaction.fraud_status !== '' && (
            <div
              tabIndex={0}
              role="button"
              id="my_modal_7"
              className="btn btn-ghost btn-circle"
              onClick={() => setModal(true)}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm bg-slate-800 py-2 text-white indicator-item">{transaction.transaction.fraud_status !== '' ? 1 : 0}</span>
              </div>
              {/* The button to open modal */}
            </div>
            )}
            <div className="flex  items-center gap-3">
              <Image
                src={user?.profile ?? ''}
                alt="profile"
                width={50}
                height={50}
                className="rounded-full border-[1px] w-[57px] h-[45px] lg:w-[50px] lg:h-[50px] "
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
      {onModal && (
        <ModalNavbar handler={onActionModal} data={transaction} />
      )}
    </div>
  );
}

export default Navbar;
