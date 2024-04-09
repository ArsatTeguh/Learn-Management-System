import React from 'react';
import Course from '../__components/course';
import PageCourse from '../__components/pageCourse';

function Dashboard({ params } : { params: { userId: string } }) {
  return (
    <div className="p-4">
      <Course />
      <PageCourse userId={params.userId === undefined ? '' : params?.userId[0]} />
    </div>
  );
}

export default Dashboard;
