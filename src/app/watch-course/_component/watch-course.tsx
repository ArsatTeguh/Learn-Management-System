'use client';

import React, { useCallback, useState, Suspense } from 'react';
import useSWR from 'swr';
import Toast from '@/lib/toast';
import CustomeFetch from '@/lib/customeFetch';
import useSWRMutation from 'swr/mutation';
import calculateProgress from '@/lib/calculateProgress';
import SidebarChapter from './sidebar';
import VideoPage from './videoPage';
import Message from './message';

type Props = {
  userId: string;
  courseId: string;
};

async function fetcher(url: string) {
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });
  const result = await res.json();
  return result.data;
}

async function updateProgress(url: string, { arg }: { arg: any }) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(arg),
  });
  if (response.status === 401) {
    Toast({
      status: 'error',
      message: 'Your Must Login',
    });
  }
  return response;
}

function WatchCourse({ courseId, userId }: Props) {
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const { Fetch } = CustomeFetch();
  const { data, mutate } = useSWR(`/api/chapter/${courseId}/${userId}`, fetcher);
  const { trigger } = useSWRMutation('/api/chapter/progress', updateProgress);

  const checkout = async () => {
    const request = {
      id: courseId,
      productName: data?.course?.title as string,
      price: data?.course?.price as number,
      quantity: 1,
    };
    try {
      const req = await Fetch({
        url: 'api/tokenMidtrans',
        method: 'POST',
        body: request,
      });
      const res = await req?.json();
      if (!req.ok) {
        throw new Error(res.message);
      }
      (window as any).snap.pay(res.token);
    } catch (error: any) {
      Toast({
        status: 'error',
        message: error.message,
      });
    }
  };

  const onProgress = () => {
    if (userId) {
      const dataProgress = {
        courseId,
        chapterId: data?.course?.chapter_course[currentVideo]?.asset_id,
      };
      trigger(dataProgress);
    }
    setCurrentVideo((prev) => {
      // eslint-disable-next-line no-unsafe-optional-chaining
      if (prev === data?.course?.chapter_course.length - 1) {
        return (prev = 0);
      }
      return prev + 1;
    });
  };

  const onAction = ({
    message,
    like,
    dislike,
    name,
  }: {
    message: string;
    like: boolean;
    dislike: boolean;
    name: string;
  }) => {
    const requestAction = {
      message,
      like,
      dislike,
      name,
    };
    const req = {
      courseId,
      chapterId: currentVideo,
      data: requestAction,
    };
    Fetch({ url: 'api/chapter/message', method: 'POST', body: req });
    mutate();
  };

  const onCurrentVideo = useCallback((e: number) => setCurrentVideo(e), []);
  return (
    <div className=" ">
      <div className="h-full lg:block hidden mt-20 fixed lg:overflow-y-hidden  border-r-[1px] ">
        <p className="font-medium px-4 py-3 text-md text-zinc-800">
          {data?.course?.title}
        </p>
        {data?.progress?.length > 0 && (
          <div className="px-3 border-b pb-4">
            <progress
              className="progress w-full progress-info transition-all"
              value={calculateProgress(
                data?.progress[0].progress?.length,
                data?.course?.chapter_course?.length,
              )}
              max="100"
            />
            <p className="font-medium text-sm">
              {calculateProgress(
                data?.progress[0].progress?.length ?? 0,
                data?.course?.chapter_course?.length,
              )}
              % Complete
            </p>
          </div>
        )}
        <Suspense fallback="">
          <SidebarChapter
            currentVideo={currentVideo}
            onCurrentVideo={onCurrentVideo}
            list={data?.course?.chapter_course}
          />
        </Suspense>

      </div>
      <div className="lg:pl-64 pt-20 overflow-x-hidden">
        <div className="px-4 w-full grid lg:grid-cols-3 grid-cols-1 place-items-start gap-2">
          <div className="w-full lg:col-span-2">
            {!data?.course ? (
              <span className="block skeleton rounded aspect-video mt-4" />
            ) : (
              <Suspense fallback="">
                <VideoPage
                  checkout={checkout}
                  onProgress={onProgress}
                  video={data?.course}
                  currentVideo={currentVideo}
                  progress={data?.progress[0]?.progress}
                  onAction={onAction}
                  userId={userId}
                />
              </Suspense>
            )}
          </div>
          <div className="lg:col-span-1 pt-4  h-full w-full relative">
            <div className="bg-slate-300/20 p-4">
              <p className="font-semibold text-lg">Comment</p>
              <span className="block w-[50%] h-[2px] bg-zinc-400 rounded-full" />
              <span className="block w-[25%] h-[2px] mt-1 bg-zinc-400 rounded-full" />
            </div>
            <div className="flex flex-col  gap-4 w-full bg-slate-300/20 p-4 rounded-md">
              {data?.course?.chapter_course[currentVideo]?.comment?.map((item: any) => (
                <div key={item.message} className="border-b w-full">
                  <p className="text-sm font-medium text-black">@{item?.user}</p>
                  <p className="text-xs text-justify text-black">
                    {item?.message}
                  </p>
                  <span className="w-full block bg-zinc-200 h-[1px] mt-1 rounded-full" />
                </div>
              ))}
            </div>
            <Message onAction={onAction} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchCourse;