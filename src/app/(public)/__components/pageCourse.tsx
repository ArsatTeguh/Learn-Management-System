import React from 'react';
import CardCourse from './cardCourse';

async function PageCourse({ userId } : { userId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/courseAll`,
    { cache: 'no-store' },
  );
  const { data } = await response.json();

  return (
    <div>
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 lg:grid-cols-3 gap-4 py-8 place-items-center">
          {data.data.map((item: any) => (
            <CardCourse data={item} key={item.title} userId={userId} />
          ))}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
}

export default PageCourse;
