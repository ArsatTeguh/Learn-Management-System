'use client';

import React, {
  useCallback, useState, Suspense, useEffect,
} from 'react';
import useSWR from 'swr';
import Toast from '@/lib/toast';
import CustomeFetch from '@/lib/customeFetch';
import calculateProgress from '@/lib/calculateProgress';
import { io } from 'socket.io-client';
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
  const [progressSocket, setProgressSocket] = useState<ProgressType>({ count: -1, chapter: [] });
  const { Fetch } = CustomeFetch();
  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/chapter/${courseId}/${userId}`, fetcher, {
    onSuccess: () => {
      Toast({
        status: 'success',
        message: 'Revalidate Date',
      });
      setMessageSocket(null);
    },
  });
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    withCredentials: true,
  });
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
        chapterId: data?.course?.chapter_course[currentVideo]?.asset_id,
      };
      const res = await updateProgress(`${process.env.NEXT_PUBLIC_API_URL}/api/chapter/progress`, dataProgress);
      if (res.status === 200) {
        socket.emit('pesanDariKlien', { count: data?.progress[0].progress?.length ?? 0, chapter: data?.course?.chapter_course[currentVideo]?.asset_id });
      }
    }
    // eslint-disable-next-line no-unsafe-optional-chaining
    if (currentVideo < data?.course?.chapter_course.length - 1) {
      setCurrentVideo((prev) => prev + 1);
    }
  };

  const onAction = (
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
    const req = {
      courseId,
      chapterId: currentVideo,
      data: requestAction,
    };
    if (message.trim() !== '') {
      socket.emit('message', { name, message, currentVideo: data?.course?.chapter_course[currentVideo]?.asset_id });
    } else {
      const currenAction = actionSocket?.filter((item: ActionType) => item.id === currentVideo);
      socket.emit('message', {
        message,
        like,
        dislike,
        actionSocket: currenAction ? currenAction[0] : {},
        user: userId,
        currentVideo: data?.course?.chapter_course[currentVideo]?.asset_id,
        index: currentVideo,
      });
    }
    Fetch({ url: 'api/chapter/message', method: 'POST', body: req }).then((res) => {
      if (res.status === 200 && message.trim() !== '') {
        socket.emit('pesanDariKlien', { name, message });
      } else {
        socket.emit('like-dislike', { dislike, like });
      }
      mutate();
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  useEffect(() => {
    socket.on('connection', () => {
      console.log('connected');
    });
    // Mendengarkan pesan dari server
    socket.on('pesanDariServer', (teks) => {
      setProgressSocket((prev) => ({
        count: teks.count,
        chapter: [...prev.chapter, teks.chapter],
      }));
    });

    socket.on('action', (teks: ActionType) => {
      setActionSocket((prev: ActionType[] | null) => {
        if (!prev) return null;
        return prev.map((item) => {
          if (item.id === currentVideo) {
            return teks;
          }
          return item;
        });
      });
    });
    socket.on('chat', (teks: CallbackMessage) => {
      setMessageSocket((prev) => {
        const newprev = prev || [];
        return [...newprev,
          { name: teks.name, message: teks.message, currentVideo: teks.currentVideo }];
      });
    });

    return () => {
      // socket.off('pesanDariServer'); // Memastikan untuk membersihkan listener
      socket.off('chat'); // Memastikan untuk membersihkan listener
      socket.off('action'); // Memastikan untuk membersihkan listener
      socket.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const onCalculate = () => {
    if (progressSocket.count === -1) {
      return calculateProgress(
        data?.progress[0].progress?.length ?? 0,
        data?.course?.chapter_course?.length,
      );
    }
    return calculateProgress(
      progressSocket.count,
      data?.course?.chapter_course?.length,
    );
  };
  const onCurrentVideo = useCallback((videoId: number) => {
    setCurrentVideo(videoId);
  }, []);

  useEffect(() => {
    data?.course?.chapter_course.map((item: any, index: number) => checkOnActionById(
      { index, like: item.action.isLike, dislike: item.action.isDislike },
    ));
  }, [data]);

  useEffect(() => {
    socket.emit('joinRoom', { currentVideo: data?.course?.chapter_course[currentVideo]?.asset_id });
    return () => {
      socket.emit('leaveRoom', { currentVideo: data?.course?.chapter_course[currentVideo]?.asset_id });
    };
  }, [currentVideo, data, socket]);

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
                  progressSocket={progressSocket}
                  actionSocket={actionSocket}
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
            <div className="flex flex-col  gap-4 w-full bg-slate-300/20 p-4 rounded-md max-h-[50%] overflow-y-auto">
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
              === data?.course?.chapter_course[currentVideo]?.asset_id)
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
