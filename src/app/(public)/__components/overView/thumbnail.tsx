'use client';

import React from 'react';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { TbFileCertificate } from 'react-icons/tb';
import { HiDevicePhoneMobile } from 'react-icons/hi2';
import { IoMdLink } from 'react-icons/io';
import { CourseById } from '@/lib/typeCourse';
import Image from 'next/image';
import MuxPlayer from '@mux/mux-player-react';
import { useRouter } from 'next/navigation';

function Thumbnail({ course }: { course: CourseById }) {
  const router = useRouter();
  const onNavigate = ({
    userId,
    courseId,
  }: {
    userId: string | null;
    courseId: string;
  }) => {
    if (userId === null) {
      router.push(`/watch-course/${courseId}`);
    } else {
      router.push(`/watch-course/${courseId}/${userId}`);
    }
  };
  return (
    <div className="w-full h-full relative text-zinc-700">
      <span className="w-full h-[300px] relative flex px-8 flex-col gap-3 text-white justify-center rounded">
        <Image
          src={course.thumbnail}
          alt={course.title}
          width={500}
          height={500}
          className="absolute w-full left-0 h-full object-cover"
        />
        <p className="text-2xl font-semibold  z-[1]">{course?.title}</p>
        <p className="lg:max-w-[60%] z-[1] pt-2 text-md font-medium">
          {course?.description}
        </p>
        <div className="text-sm z-[1]">
          <div className="flex gap-2">
            Dibuat oleh :{' '}
            <p className="text-blue-400 font-medium">arsatteguh</p>{' '}
          </div>
          <div className="flex gap-2 ">
            <p className="text-blue-400 font-medium">{course?.players}</p>
            Peserta{' '}
          </div>
        </div>
        <span className="inset-0 absolute top-0 left-0 linier" />
      </span>
      <span className="w-[330px] hidden lg:block bg-slate-100 shadow-lg border p-2 rounded h-auto absolute  top-10 right-10">
        <span className="block w-full h-[180px] relative rounded ">
          <MuxPlayer
            playbackId={course.videoUrl}
            className="h-full absolute right-0 w-full"
          />
        </span>
        <p className="text-xl font-semibold my-4 px-2">
          {course.isLock ? `Rp.${course.price}` : ''}
        </p>
        {course.isLock ? (
          <div className="flex flex-col gap-2 w-full h-full px-2">
            <button type="button" className="btn btn-primary">
              Buy Now
            </button>
            <button className="btn btn-outline btn-primary" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Save
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full h-full px-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                onNavigate({
                  userId: course?.client_id,
                  courseId: course?.courseId,
                })
              }
            >
              Start Learning
            </button>
          </div>
        )}

        <div className="mt-3 px-2">
          <p className="font-semibold text-md py-2">Kursus ini mencangkup: </p>
          <ul className="flex flex-col gap-3 py-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="text-lg">
                <MdOutlineOndemandVideo />
              </span>
              <p>Video dengang 12 jam</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">
                <HiDevicePhoneMobile />
              </span>
              <p>Akses di perangkat seluler</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">
                <IoMdLink />
              </span>
              <p>Akses penuh seumur hidup</p>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lg">
                <TbFileCertificate />
              </span>
              <p>Sertifikat penyelesaian</p>
            </li>
          </ul>
        </div>
      </span>
      {course.isLock ? (
        <div className="flex md:hidden mt-2 flex-col gap-2 w-full h-full px-2">
          <button type="button" className="btn btn-primary">
            Buy Now
          </button>
          <button className="btn btn-outline btn-primary" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Save
          </button>
        </div>
      ) : (
        <div className="flex md:hidden mt-2 flex-col gap-2 w-full h-full px-2">
          <button type="button" className="btn btn-primary">
            Start Learning
          </button>
        </div>
      )}

      <div className="mt-3 px-2 block lg:hidden">
        <p className="font-semibold text-md py-2">Kursus ini mencangkup: </p>
        <ul className="flex flex-col gap-3 py-3 text-sm">
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <MdOutlineOndemandVideo />
            </span>
            <p>Video dengang 12 jam</p>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <HiDevicePhoneMobile />
            </span>
            <p>Akses di perangkat seluler</p>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <IoMdLink />
            </span>
            <p>Akses penuh seumur hidup</p>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-lg">
              <TbFileCertificate />
            </span>
            <p>Sertifikat penyelesaian</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Thumbnail;
