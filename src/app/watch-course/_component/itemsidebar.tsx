import React from 'react';
import { TbPlayerPlay } from 'react-icons/tb';
import { MdLockOutline } from 'react-icons/md';
import { FaPause } from 'react-icons/fa6';

type Props = {
  asset_id: string;
  chapter: string;
  unLock: boolean;
  currentVideo: number;
  onCurrentVideo: (e: number) => void;
  index: number;
};

function Itemsidebar({
  asset_id,
  chapter,
  unLock,
  currentVideo,
  onCurrentVideo,
  index,
}: Props) {
  return (
    <div
      onClick={() => onCurrentVideo(index)}
      className={` text-sm cursor-pointer font-medium flex items-centter gap-3 p-3    ${
        currentVideo === index
          ? 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700'
          : 'hover:bg-slate-300/20 hover:text-slate-600 text-slate-500'
      } `}
      key={asset_id}
    >
      <span className="text-xl font-semibold transition-all">
        {unLock ? (
          <p>
            <MdLockOutline />
          </p>
        ) : (
          <p>{currentVideo === index ? <FaPause /> : <TbPlayerPlay />} </p>
        )}
      </span>
      <span>{chapter}</span>
    </div>
  );
}

export default Itemsidebar;
