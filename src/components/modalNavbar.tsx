import { PropsTransaction } from '@/state/transaction';
import React, { useEffect } from 'react';
import { IoCopySharp } from 'react-icons/io5';

interface Props {
  handler: (action: 'done' | 'close') => void;
  data: PropsTransaction
}

function ModalNavbar({ handler, data }: Props) {
  useEffect(() => {
    // Disable scrolling when modal opens
    document.body.style.overflow = 'hidden';

    // Re-enable scrolling when modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[10] flex items-center justify-center">
      <div className="lg:w-[550px] w-[330px] rounded-lg shadow-xl border border-gray-100 bg-white transform transition-all">
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-end mb-4">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button type="button" onClick={() => handler('close')} className="text-gray-400 hover:text-gray-500 transition-colors">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-6 text-sm flex flex-col gap-4">
            <div className="font-medium items-center gap-1 rounded-md bg-slate-800 text-white py-4">
              <p className="lg:text-lg  text-center capitalize">{data.transaction.transaction_status}</p>
              <p className=" lg:text-xl text-center ">{data.request.productName}</p>
              <p className="text-xs  text-center hidden lg:block">ID : {data.transaction.order_id}</p>
            </div>
            <div className="p-3 border-2 border-dashed flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Price</p>
                <div className="w-full p-3 rounded bg-zinc-100 ">Rp. {data.request.price}</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Type</p>
                <div className="w-full p-3 rounded bg-zinc-100 ">{data.transaction.payment_type}</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Via</p>
                <div className="w-full p-3 rounded bg-zinc-100 ">{data.transaction.va_numbers[0].bank}</div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium">No. Bank</p>
                <div className="w-full p-3 rounded bg-zinc-100 relative flex items-center gap-2">{data.transaction.va_numbers[0].va_number}
                  <span className="absolute right-5 text-xl cursor-pointer"><IoCopySharp /></span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => handler('done')}
              className="px-6 py-2.5 rounded border lg:text-md text-sm w-full border-slate-900 text-slate-900 font-medium hover:bg-blue-50 transition-colors"
            >
              Check Status
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalNavbar;
