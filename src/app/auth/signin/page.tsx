'use client';

import { Tinput } from '@/lib/login';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/lib/toast';
import CustomeFetch from '@/lib/customeFetch';

function SignIn() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const { Fetch } = CustomeFetch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tinput>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<Tinput> = async (data) => {
    setloading(true);
    try {
      const response = await Fetch({ url: 'api/login', method: 'POST', body: data });
      const result = await response?.json();
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        Toast({
          status: 'success',
          message: result.message,
        });
        router.push('/');
        router.refresh();
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
      <p className="text-xl font-medium">Login Your Acount</p>
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
                must5character: (value: string) => value.length >= 5 || 'Must be 5 characters',
              },
            })}
          />
        </label>
        <span className="text-red-500 font-medium text-[12px]">
          {errors.password?.message}
        </span>
        <button
          disabled={loading}
          type="submit"
          className="btn disabled:bg-zinc-500 bg-sky-500 border-sky-500 text-white hover:bg-sky-600"
        >
          Login
        </button>
      </form>
      <div className="flex items-center gap-2 pb-3 justify-center text-md">
        <p>or</p>
        <p className="font-semibold text-sky-500">Forgot Password ? </p>
      </div>
      <span className="border-t-[1px] block w-1/2 h-1 border-zinc-400 mx-auto pb-3" />
      <div className="flex items-center gap-2 justify-center">
        <p className="text-base">Dont have an account </p>
        <Link href="/auth/register">
          <p className="font-semibold text-sky-500 cursor-pointer">
            Register ?{' '}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
