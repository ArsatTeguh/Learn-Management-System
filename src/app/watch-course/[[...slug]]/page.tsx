import dynamic from 'next/dynamic';
import React from 'react';

const DynamicWatchCourse = dynamic(() => import('../_component/watch-course'), {
  ssr: false,
});
async function PageWatchCourse({ params }: { params: { slug: string[] } }) {
  const userId = !params.slug[1] ? '' : params.slug[1];
  const courseId = !params.slug[0] ? '' : params.slug[0];
  return (
    <div className="">
      <DynamicWatchCourse courseId={courseId} userId={userId} />
    </div>
  );
}

export default PageWatchCourse;
