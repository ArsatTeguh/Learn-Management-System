'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoBookOutline } from 'react-icons/io5';

type Props = {
  data: any;
  userId: string
};

function CardCourse({ data, userId }: Props) {
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const onPage = (url: string) => route.push(url);
  return (
    <div
      // eslint-disable-next-line no-underscore-dangle
      onClick={() => onPage(`/watch-course/${data._id}/${userId}`)}
      className="card hover:bg-sky-100/50 lg:w-80 w-[21rem] bg-white shadow rounded-md cursor-pointer"
    >
      <figure>
        <Image src={data.thumbnail} alt="thumbnail" width={600} height={600} className={`lg:h-[200px] object-cover w-full transition-all duration-300 ${loading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}`} onLoadingComplete={() => setLoading(false)} />
      </figure>
      <div className="flex flex-col gap-3 px-3 py-3">
        <p className="text-lg font-semibold">{data.title}</p>
        <div className="flex items-center gap-2">
          <p className="w-8 h-8 flex justify-center items-center rounded-full text-sky-500 bg-sky-100/50">
            <IoBookOutline />
          </p>
          <p className="text-zinc-500 text-xs font-medium">
            {data.length_chapter} Chapters
          </p>
        </div>
        <p className={`${data.buyer_id.includes(userId) ? 'text-sky-600' : 'text-zinc-800'}  font-medium `}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {data.isFree ? 'Free' : (data.buyer_id.includes(userId) ? 'Owned' : `Rp.${data.price}`)}
        </p>
      </div>
    </div>
  );
}

export default CardCourse;
