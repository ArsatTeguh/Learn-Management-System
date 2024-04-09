import MuxPlayer from '@mux/mux-player-react';
import React from 'react';
import { SlLike, SlDislike } from 'react-icons/sl';

function VideoPage({
  video,
  currentVideo,
  checkout,
  onProgress,
  progress,
  onAction,
  userId,
}: {
  video: any;
  currentVideo: number;
  checkout: () => Promise<void>;
  onProgress: () => void
  progress: Array<string>
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

}) {
  return (
    <div className="mt-4">
      {video.chapter_course[currentVideo].unLock ? (
        <span className="aspect-video   text-white h-full flex items-center rounded justify-center bg-black">
          <p className="text-xl py-2 font-medium bg-red-500 w-full text-center">
            Make a Purchase to advance to this lesson
          </p>
        </span>
      ) : (
        <div className="aspect-video text-white text-center rounded">
          <MuxPlayer
            playbackId={video.chapter_course[currentVideo].playbackId}
          />
        </div>
      )}
      <div className="flex items-center justify-between py-2 border-b-2">
        <div className="flex flex-col gap-2">
          <p className="font-medium text-xl text-zinc-800">
            {' '}
            {video.chapter_course[currentVideo].chapter}{' '}
          </p>
          <div className="flex items-center gap-6 text-lg">
            <span
              className={`${video?.chapter_course[currentVideo]?.action?.isLike.includes(userId) && 'text-sky-600'} flex items-center gap-2 font-medium cursor-pointer`}
              onClick={() => onAction({
                message: '', like: true, dislike: false, name: '',
              })}
            >
              <SlLike />
              <span className="text-sm">{video.chapter_course[currentVideo]?.action.isLike.length}</span>
            </span>
            <span
              className={`${video?.chapter_course[currentVideo]?.action?.isDislike.includes(userId) && 'text-sky-600'} flex items-center gap-2 font-medium cursor-pointer`}
              onClick={() => onAction({
                message: '', like: false, dislike: true, name: '',
              })}
            >
              <SlDislike />
              <span className="text-sm ">{video.chapter_course[currentVideo]?.action.isDislike.length}</span>
            </span>
          </div>
        </div>

        {video.chapter_course[currentVideo].unLock ? (
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
              disabled={progress?.includes(video?.chapter_course[currentVideo].asset_id)}
              onClick={onProgress}
              type="button"
              className=" disabled:bg-zinc-500 px-8 py-2 bg-sky-500 text-white font-medium rounded"
            >
              Mark as complete
            </button>
          </div>
        )}
      </div>
      <p className="text-sm mt-2 text-zinc-600">
        {video?.chapter_course[currentVideo].capter_desc}
      </p>
    </div>
  );
}

export default VideoPage;
