import React from 'react';
import Loadingsidebar from '@/lib/loadingsidebar';
import Itemsidebar from './itemsidebar';

interface Props {
  list: Array<{
    asset_id: string;
    chapter: string;
    unLock: boolean;
    courseId: string;
  }>;
  currentVideo: number;
  onCurrentVideo: (e: number) => void;
}

function SidebarChapter({ list, currentVideo, onCurrentVideo }: Props) {
  return (
    <div className=" h-full">
      <div className="h-screen overflow-y-hidden py-4 bg-white w-64">
        {!list ? (
          <Loadingsidebar />
        ) : (
          <div className="flex flex-col gap-2  ">
            {list?.map((item, index: number) => (
              <Itemsidebar
                key={item.asset_id}
                index={index}
                {...item}
                currentVideo={currentVideo}
                onCurrentVideo={onCurrentVideo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarChapter;
