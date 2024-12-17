'use client';

import React from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { fetcherAll } from '@/app/watch-course/_component/typeData';
import CardCourse from './cardCourse';
import LoadingCard from './loadingCard';

function PageCourse({ userId } : { userId: string }) {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  // const title = searchParams.get('title');
  const { data, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/courseAll/?category=${category ?? ''}`, fetcherAll);

  return (
    <div>
      {!isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4 py-8 place-items-center">
          {data?.map((item: any) => (
            <CardCourse data={item} key={item.title} userId={userId} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4 py-8 place-items-center">
          <LoadingCard />
          <LoadingCard />
          <LoadingCard />
        </div>
      )}
    </div>
  );
}

export default PageCourse;
