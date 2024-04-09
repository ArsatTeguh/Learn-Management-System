import React from 'react';
import { PropsInput } from '@/lib/register';

function Input(props: PropsInput) {
  const {
    channel,
    teks,
    register,
    place,
    errors,
    type,
  } = props;
  return (
    <div className="flex flex-col w-full gap-1 relative">
      <div className="flex flex-col gap-2">
        <label htmlFor={channel} className="text-[16px] font-[500]">
          {teks}
        </label>
        <input
          type={type ?? 'text'}
          className={`input focus:outline-none w-full max-w-xs ${errors[channel] ? ' input-error' : 'input-primary'}`}
          placeholder={place}
          {...register(channel, {
            validate: {
              must5character: (value:string) => (
                value.length >= 5 || 'Harus lebih dar 5 caracter'
              ),
            },
          })}
        />
      </div>
      <span className="text-red-600 text-[13px] font-[500]  ">
        {errors[channel]?.message}
      </span>
    </div>
  );
}

export default Input;
