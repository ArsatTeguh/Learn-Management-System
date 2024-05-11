import { FileUpload } from '@/components/file-upload';
import Image from 'next/image';
import React from 'react';

type Props = {
  setSelectedMedia: any
  selectedMedia: string;
  media: 'image' | 'video';
  // eslint-disable-next-line react/require-default-props
  id?: number
};

function InputImage({
  selectedMedia,
  setSelectedMedia,
  media,
  id,
}: Props) {
  return (
    <div className="block">
      {media === 'image' ? (
        <div>
          {selectedMedia && media === 'image' ? (
            <div className="relative aspect-video bg-slate-100">
              <Image alt="thumbnail" src={selectedMedia ?? ''} fill className="object-cover" />
            </div>
          ) : (
            <div className=" bg-slate-100 p-2 ">
              <FileUpload
                onChange={(url) => {
                  if (url) setSelectedMedia(url);
                }}
                endpoint="courseImage"
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          {selectedMedia && media === 'video' ? (
            <div className="relative  bg-green-600 rounded p-4">
              <p className="flex items-center text-white justify-center font-medium">Video Success Upload</p>
            </div>
          ) : (
            <div className=" bg-slate-100 p-2 rounded ">
              <FileUpload
                onChange={(url) => {
                  if (url) setSelectedMedia(id, 'videoUrl', url);
                }}
                endpoint="chapterVideo"
              />
              <p className="text-sm text-sky-600 mt-2 font-medium">According to MUX regulations, videos cannot exceed 10 seconds</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default InputImage;
