'use client';

import React, {
  useState, Suspense, useEffect,
} from 'react';
import useSWR from 'swr';
import Toast from '@/lib/toast';
import CustomeFetch from '@/lib/customeFetch';
import calculateProgress from '@/lib/calculateProgress';
import { CalculateAction } from '@/lib/calculateaAction';
import SidebarChapter from './sidebar';
import VideoPage from './videoPage';
import Message from './message';
import {
  ActionType, fetcher, InputAction, MessageType, OnActionType, ProgressType,
  updateProgress,
} from './typeData';

type Props = {
  userId: string;
  courseId: string;
};

function WatchCourse({ courseId, userId }: Props) {
  const [currentVideo, setCurrentVideo] = useState<number>(0);
  const [actionSocket, setActionSocket] = useState<Array<ActionType> | null>(null);
  const [messageSocket, setMessageSocket] = useState<Array<MessageType> | null >(null);
  const [progressSocket, setProgressSocket] = useState<ProgressType | null>(null);
  const { Fetch, loading } = CustomeFetch();

  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/chapter/${courseId}/${userId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 10000,
      keepPreviousData: true,
      suspense: true,
    },
  );

  const chapterId = data?.course?.chapter_course[currentVideo]?.asset_id;
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

  const checkOnActionById = ({ index, like, dislike } : OnActionType) => {
    const valueById = {
      id: index,
      like,
      dislike,
    };
    setActionSocket((prev) => {
      const safePrev = prev || [];
      return [...safePrev, valueById];
    });
  };

  const onProgress = async () => {
    if (userId && data?.progress?.length > 0) {
      const dataProgress = {
        courseId,
        chapterId,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await updateProgress(`${process.env.NEXT_PUBLIC_API_URL}/api/chapter/progress`, dataProgress);
    }

    setProgressSocket((prev) => {
      const newprev = !prev?.chapter ? { count: prev?.count!, chapter: [] } : prev;
      return {
        count: newprev.count,
        chapter: [...newprev.chapter, chapterId],
      };
    });
    // eslint-disable-next-line no-unsafe-optional-chaining
    if (currentVideo < data?.course?.chapter_course.length - 1) {
      setCurrentVideo((prev) => prev + 1);
    }
  };

  const onAction = async (
    {
      message, like, dislike, name,
    }:
    InputAction,
  ) => {
    const requestAction = {
      message,
      like,
      dislike,
      name,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const req = {
      courseId,
      chapterId: currentVideo,
      data: requestAction,
    };
    await Fetch({ url: 'api/chapter/message', method: 'POST', body: req });
    if (message.trim() === '') {
      const currenAction = actionSocket?.filter((item: ActionType) => item.id === currentVideo);
      const newAction = CalculateAction({
        actionSocket: currenAction ? currenAction[0] : {},
        user: userId,
        like,
        dislike,
      });
      setActionSocket((prev: any) => {
        if (!prev) return null;
        return prev.map((item: any) => {
          if (item.id === currentVideo) {
            return newAction;
          }
          return item;
        });
      });
    } else {
      setMessageSocket((prev) => {
        if (prev === null) {
          return [{ currentVideo: chapterId, name, message }];
        }
        return [...prev, { currentVideo: chapterId, name, message }];
      });
    }
  };

  const onCalculate = () => {
    const chapter = !progressSocket?.chapter ? 0 : progressSocket?.chapter?.length;
    return calculateProgress(
      chapter,
      progressSocket?.count as number,
    );
  };

  const onCurrentVideo = (videoId: number) => {
    setCurrentVideo(videoId);
  };

  useEffect(() => {
    if (!data) return;

    data.course?.chapter_course?.forEach((item: any, index: number) => {
      checkOnActionById({
        index,
        like: item.action.isLike,
        dislike: item.action.isDislike,
      });
    });

    setProgressSocket({
      count: data.course?.length_chapter,
      chapter: data.progress[0]?.progress,
    });

    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="h-full lg:block hidden mt-20 fixed lg:overflow-y-hidden  border-r-[1px] ">
        <p className="font-medium px-4 py-3 text-md text-zinc-800">
          {data?.course?.title}
        </p>

        <div className="px-3 border-b pb-4 transition-all">
          <progress
            className="progress w-full progress-info transition-all"
            value={onCalculate()}
            max="100"
          />
          <p className="font-medium text-sm">
            {onCalculate()}% Complete
          </p>
        </div>

        <Suspense fallback="">
          <SidebarChapter
            isMobile={false}
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
                  onAction={onAction}
                  userId={userId}
                  progressSocket={progressSocket}
                  actionSocket={actionSocket}
                />
              </Suspense>
            )}
          </div>
          <div className="mt-4 block lg:hidden bg-zinc-50 rounded-md w-full mx-auto py-4">
            <SidebarChapter
              isMobile
              currentVideo={currentVideo}
              onCurrentVideo={onCurrentVideo}
              list={data?.course?.chapter_course}
            />
          </div>
          <div className="lg:col-span-1 pt-4 lg:pt-0  lg:p-2 pb-4 lg:pb-0 h-full w-full relative">

            <div className=" lg:p-4 rounded ">
              <Message onAction={onAction} />
              <span className="w-full block  h-[1px] lg:my-2 my-1 rounded-full" />
              <div className="flex flex-col gap-4 bg-zinc-50 w-full border  p-4 rounded-md max-h-[50%] overflow-y-auto">
                <p className="font-medium text-sm  text-zinc-800">Comments</p>
                <span className="w-full block bg-zinc-200 h-[1px] rounded-full" />
                {(data?.course?.chapter_course[currentVideo]?.comment.length <= 0
              && messageSocket === null) && (
                <div>
                  <p className="text-center text-zinc-500 text-sm">No comments yet</p>
                </div>
                )}
                {data?.course?.chapter_course[currentVideo]
                  ?.comment?.map((item: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                    <div key={index} className=" w-full">
                      <p className="text-sm font-normal  text-zinc-500">@{item?.user.replace('@gmail.com', '')}</p>
                      <p className="text-sm text-justify  pt-1 text-zinc-900">
                        {item?.message}
                      </p>
                    </div>
                  ))}
                {messageSocket?.filter((item) => item.currentVideo
              === chapterId)
                  .map((item) => (
                  // eslint-disable-next-line react/no-array-index-key
                    loading ? (
                      <div key={item.message} className="  w-full">
                        <div className="skeleton h-4 w-28" />
                        <div className="skeleton h-4 w-full  mt-2" />

                      </div>
                    ) : (
                      <div key={item.message} className="  w-full">
                        <p className="text-sm font-normal  text-zinc-500">@{item?.name.replace('@gmail.com', '')}</p>
                        <p className="text-sm text-justify   pt-1 text-zinc-900">
                          {item?.message}
                        </p>

                      </div>
                    )
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WatchCourse;
