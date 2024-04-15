'use client';

import React, {
  useCallback, useState, Suspense, useEffect,
} from 'react';
import useSWR from 'swr';
import Toast from '@/lib/toast';
import CustomeFetch from '@/lib/customeFetch';
import calculateProgress from '@/lib/calculateProgress';
import Pusher from 'pusher-js';
import { FetchSocket } from '@/lib/fetchSocket';
import SidebarChapter from './sidebar';
import VideoPage from './videoPage';
import Message from './message';
import {
  ActionType, CallbackMessage, fetcher, InputAction, MessageType, OnActionType, ProgressType,
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
  const { Fetch } = CustomeFetch();

  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/chapter/${courseId}/${userId}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
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
    if (userId) {
      const dataProgress = {
        courseId,
        chapterId,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await updateProgress(`${process.env.NEXT_PUBLIC_API_URL}/api/chapter/progress`, dataProgress);
      setProgressSocket((prev) => {
        const newprev = prev ?? { count: 0, chapter: [] };
        return {
          count: newprev.count,
          chapter: [...newprev.chapter, chapterId],
        };
      });
      // if (res.status === 200) {
      //   setProgressSocket((prev) => {
      //     const newprev = prev ?? { count: 0, chapter: [] };
      //     return {
      //       count: newprev.count,
      //       chapter: [...newprev.chapter, chapterId],
      //     };
      //   });
      // }
    }
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
    if (message.trim() !== '') {
      await FetchSocket({ url: 'message', body: { name, message, currentVideo: chapterId } });
    } else {
      const currenAction = actionSocket?.filter((item: ActionType) => item.id === currentVideo);
      await FetchSocket({
        url: 'action',
        body:
        {
          message,
          like,
          dislike,
          actionSocket: currenAction ? currenAction[0] : {},
          user: userId,
          currentVideo: chapterId,
          index: currentVideo,
        },
      });
    }
    // Fetch({ url: 'api/chapter/message', method: 'POST', body: req }).then((res) => {

    // });
  };

  const onCalculate = () => calculateProgress(
    progressSocket?.chapter?.length as number,
    progressSocket?.count as number,
  );

  const onCurrentVideo = useCallback((videoId: number) => {
    setCurrentVideo(videoId);
  }, []);

  useEffect(() => {
    data?.course?.chapter_course.map((item: any, index: number) => checkOnActionById(
      { index, like: item.action.isLike, dislike: item.action.isDislike },
    ));
    setProgressSocket({
      count: data?.course?.length_chapter,
      chapter: data?.progress[0]?.progress,
    });
    return () => {};
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const pusherClinet = new Pusher('3006004164fdcfb53231', {
      cluster: 'ap1',
      forceTLS: true,
    });
    const handlerMessage = (res: CallbackMessage) => {
      setMessageSocket((prev) => {
        const newprev = prev || [];
        return [...newprev,
          { name: res.name, message: res.message, currentVideo: res.currentVideo }];
      });
    };
    const handlerAction = (res: ActionType) => {
      setActionSocket((prev: ActionType[] | null) => {
        if (!prev) return null;
        return prev.map((item) => {
          if (item.id === currentVideo) {
            return res;
          }
          return item;
        });
      });
    };
    let channel: any;
    if (chapterId) {
      channel = pusherClinet.subscribe(chapterId);
      channel.bind('chat', (res: CallbackMessage) => {
        handlerMessage(res);
      });
      channel.bind('behavior', (res: ActionType) => {
        handlerAction(res);
      });
      return () => {
        channel.unbind('chat', handlerMessage);
        channel.unbind('behavior', handlerAction);
        pusherClinet.unsubscribe(chapterId);
      };
    }
  }, [chapterId, currentVideo]);

  return (
    <div>
      <div className="h-full lg:block hidden mt-20 fixed lg:overflow-y-hidden  border-r-[1px] ">
        <p className="font-medium px-4 py-3 text-md text-zinc-800">
          {data?.course?.title}
        </p>
        {data?.progress?.length > 0 && (
          <div className="px-3 border-b pb-4 transition-all">
            <progress
              className="progress w-full progress-info transition-all"
              value={onCalculate()}
              max="100"
            />
            <p className="font-medium text-sm">
              {onCalculate()}
              % Complete
            </p>
          </div>
        )}
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
          <div className="mt-4 block lg:hidden bg-slate-300/20 rounded-md w-full mx-auto py-4">
            <SidebarChapter
              isMobile
              currentVideo={currentVideo}
              onCurrentVideo={onCurrentVideo}
              list={data?.course?.chapter_course}
            />
          </div>
          <div className="lg:col-span-1 pt-4  h-full w-full relative">
            <div className="bg-slate-300/20 p-4">
              <p className="font-semibold text-lg text-zinc-800">Comment</p>
              <span className="block w-[50%] h-[2px] bg-zinc-400 rounded-full" />
              <span className="block w-[25%] h-[2px] mt-1 bg-zinc-400 rounded-full" />
            </div>
            <div className="flex flex-col gap-4 w-full bg-slate-300/20 p-4 rounded-md max-h-[50%] overflow-y-auto">
              {(data?.course?.chapter_course[currentVideo]?.comment.length <= 0
              && messageSocket === null) && (
                <div>
                  <p className="text-center text-zinc-500 text-sm">No comments yet</p>
                </div>
              )}
              {data?.course?.chapter_course[currentVideo]
                ?.comment?.map((item: any, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className="border-b w-full">
                    <p className="text-sm font-medium text-black">@{item?.user}</p>
                    <p className="text-xs text-justify text-black">
                      {item?.message}
                    </p>
                    <span className="w-full block bg-zinc-200 h-[1px] mt-1 rounded-full" />
                  </div>
                ))}
              {messageSocket?.filter((item) => item.currentVideo
              === chapterId)
                .map((item, index: number) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className="border-b w-full">
                    <p className="text-sm font-medium text-black">@{item?.name}</p>
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
