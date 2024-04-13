// import dynamic from 'next/dynamic';
import React from 'react';
import WatchCourse from '../_component/watch-course';

// const DynamicWatchCourse = dynamic(() => import('../_component/watch-course'), {
//   ssr: false,
// });
async function PageWatchCourse({ params }: { params: { slug: string[] } }) {
  const userId = !params.slug[1] ? '' : params.slug[1];
  const courseId = !params.slug[0] ? '' : params.slug[0];
  const res = await fetch(`http://localhost:3000/api/chapter/${courseId}/${userId}`);
  const { data } = await res.json();
  return (
    <div className="">
      <WatchCourse courseId={courseId} userId={userId} data={data} />
    </div>
  );
}

export default PageWatchCourse;
