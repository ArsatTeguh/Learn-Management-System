import React from 'react';
import { FaInbox } from 'react-icons/fa';
import Thumbnail from '../../__components/overView/thumbnail';
import Description from '../../__components/overView/description';

async function Over({ params }: { params: { slug: [string, string] } }) {
  const { slug } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courseAll/overview/${slug[0]}/${slug[1]}`,
    { cache: 'force-cache' },
  );
  const result = await data.json();
  return (
    <div>
      {data.status !== 200 ? (
        <div className="w-full h-screen text-zinc-700 gap-4 flex flex-col p-4 justify-center items-center">
          <span className="text-6xl">
            {' '}
            <FaInbox />{' '}
          </span>
          <p className="text-2xl font-semibold">Sorry,, course not found</p>
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-4 w-full h-full">
          <Thumbnail course={result?.data} />
          <Description />
        </div>
      )}
    </div>
  );
}

export default Over;
