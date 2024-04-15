'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import Toast from '@/lib/toast';

type Props = {
  onAction: ({
    message,
    like,
    dislike,
    name,
  }: {
    message: string;
    like: boolean;
    dislike: boolean;
    name: string;
  }) => void;
};

function Message({ onAction }: Props) {
  const [valueMessage, setValueMessage] = useState('');
  const user = useSelector((state: RootState) => state.user);

  const onSubmit = () => {
    if (valueMessage !== '') {
      onAction({
        message: valueMessage,
        like: false,
        dislike: false,
        name: user?.email,
      });
      setValueMessage('');
    } else {
      Toast({
        status: 'error',
        message: 'Message not be empty',
      });
    }
  };
  return (
    <div className="lg:mt-10 mt-5 w-full flex items-center justify-center">
      <input
        type="text"
        name=""
        id=""
        className="w-full border  text-zinc-800 py-2 px-4 placeholder:text-sm"
        placeholder="comment chapter"
        value={valueMessage}
        onChange={(event: any) => setValueMessage(event.target.value)}
      />
      <button
        onClick={onSubmit}
        type="button"
        className="py-2 px-4 border bg-sky-500 text-white"
      >
        Send
      </button>
    </div>
  );
}

export default Message;
