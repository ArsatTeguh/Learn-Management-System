import React from 'react';
import WatchCourse from '../_component/watch-course';

function PageWatchCourse({ params }: { params: { slug: string[] } }) {
  const userId = !params.slug[1] ? '' : params.slug[1];
  const courseId = !params.slug[0] ? '' : params.slug[0];
  return (
    <div className="">
      <WatchCourse courseId={courseId} userId={userId} />
    </div>
  );
}

export default PageWatchCourse;
