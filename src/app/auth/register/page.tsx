'use client';

import { Tinput } from '@/lib/register';
import Toast from '@/lib/toast';
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

function SignOut() {
  const [loading, setloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tinput>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });
  const onSubmit: SubmitHandler<Tinput> = async (data) => {
    setloading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        Toast({
          status: 'success',
          message: result.message,
        });
      }
    } catch (error: any) {
      Toast({
        status: 'error',
        message: error.message,
      });
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="lg:w-1/3 w-full py-28 mx-auto px-6 ">
      <p className="text-xl font-medium">Create Your Acount</p>
      <form
        action=""
        className="flex flex-col gap-3 py-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          aria-label="email"
          htmlFor="email"
          className="input border-zinc-500 input-bordered flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70 "
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="email"
            className="grow "
            placeholder="Email"
            {...register('email', {
              required: 'Email not be empty !',
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value:
                  '^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$' as any,
                message: 'Invalid email address',
              },
            })}
          />
        </label>
        <span className="text-red-400 font-medium text-[12px]">
          {errors.email?.message}
        </span>
        <label
          aria-label="password"
          htmlFor="password"
          className="input  input-bordered flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="password"
            type="password"
            className="grow "
            placeholder="Password"
            {...register('password', {
              required: 'Password not be empty !',
              validate: {
                must5character: (value:string) => (
                  value.length >= 5 || 'Must be 5 characters'
                ),
              },
            })}
          />
        </label>
        <span className="text-red-500 font-medium text-[12px]">
          {errors.password?.message}
        </span>
        <label
          aria-label="repeatPassword"
          htmlFor="repeatPassword"
          className="input  input-bordered flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            id="repeatPassword"
            type="password"
            className="grow "
            placeholder="repeatPassword"
            {...register('repeatPassword', {
              required: 'repeatPassword not be empty !',
              validate: {
                must5character: (value:string) => (
                  value.length >= 5 || 'Must be 5 characters'
                ),
              },
            })}
          />
        </label>
        <span className="text-red-500 font-medium text-[12px]">
          {errors.repeatPassword?.message}
        </span>
        <button
          disabled={loading}
          type="submit"
          className="btn disabled:bg-zinc-500 bg-sky-500 border-sky-500 text-white hover:bg-sky-600"
        >
          Register
        </button>
      </form>
      <div className="flex items-center gap-2 justify-center">
        <p className="text-base">You have been an account </p>
        <Link href="/auth/signin">
          <p className="font-semibold text-sky-500 cursor-pointer">Login ? </p>
        </Link>
      </div>
    </div>
  );
}

export default SignOut;
