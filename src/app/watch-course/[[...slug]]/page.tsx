import dynamic from 'next/dynamic';
import React from 'react';

const DynamicWatchCourse = dynamic(() => import('../_component/watch-course'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
    </div>
  ),
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
