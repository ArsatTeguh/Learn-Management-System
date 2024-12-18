import MuxPlayer from '@mux/mux-player-react';
import React from 'react';
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi';

function VideoPage({
  video,
  currentVideo,
  checkout,
  onProgress,
  onAction,
  userId,
  progressSocket,
  actionSocket,
}: {
  video: any;
  currentVideo: number;
  checkout: () => Promise<void>;
  onProgress: () => void
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
  }) => void,
  userId: string
  progressSocket: any
  actionSocket: any
}) {
  const action = actionSocket?.filter((item: any) => item?.id === currentVideo);
  return (
    <div className="mt-4">
      {video.chapter_course[currentVideo].unLock ? (
        <span className="aspect-video   text-white h-full flex items-center rounded justify-center bg-black">
          <p className="lg:text-xl text-sm py-2 font-medium bg-red-500 w-full text-center">
            Make a Purchase to advance to this lesson
          </p>
        </span>
      ) : (
        <div className="aspect-video text-white rounded !z-0">
          <MuxPlayer
            style={{ aspectRatio: 16 / 9 }}
            maxResolution="720p"
            metadata-video-title={video.chapter_course[currentVideo].chapter}
            playbackId={video.chapter_course[currentVideo].playbackId}
          />
        </div>
      )}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 lg:items-center justify-between py-2 border-b-2">
        <div className="flex flex-col gap-2 ">
          <p className="font-medium text-lg lg:text-xl text-zinc-800">
            {' '}
            {video.chapter_course[currentVideo].chapter}{' '}
          </p>
          <div className="flex items-center gap-6 text-lg">
            <span
              className={`${action && action[0]?.like?.includes(userId) ? 'text-sky-600' : 'text-zinc-800'} flex items-center text-xl gap-2 font-medium cursor-pointer `}
              onClick={() => onAction({
                message: '', like: true, dislike: false, name: '',
              })}
            >
              <BiSolidLike />
              <span className="text-sm">{(action && action[0]?.like?.length) ?? 0}</span>
            </span>
            <span
              className={`${action && action[0]?.dislike?.includes(userId) ? 'text-red-600' : 'text-zinc-800'} flex text-xl items-center gap-2 font-medium cursor-pointer `}
              onClick={() => onAction({
                message: '', like: false, dislike: true, name: '',
              })}
            >
              <BiSolidDislike />
              <span className="text-sm ">{(action && action[0]?.dislike?.length) ?? 0}</span>
            </span>
          </div>
        </div>

        {video.chapter_course[currentVideo]?.unLock ? (
          <div className="">
            <button
              onClick={checkout}
              type="button"
              className="  px-8 py-2 bg-sky-500 text-white font-medium rounded"
            >
              Buy <span className="font-bold">Rp.{video.price}</span>
            </button>
          </div>
        ) : (
          <div className="">
            <button
              disabled={
                progressSocket?.chapter?.includes(video?.chapter_course[currentVideo].asset_id)
              }
              onClick={onProgress}
              type="button"
              className=" disabled:bg-zinc-500 px-4 text-sm lg:px-8 py-2 bg-sky-500 text-white font-medium rounded"
            >
              Mark as complete
            </button>
          </div>
        )}
      </div>
      <p className=" text-[13px] lg:text-sm lg:mt-2 mt-4 text-zinc-600">
        {video?.chapter_course[currentVideo].capter_desc}
      </p>
    </div>
  );
}

export default VideoPage;
