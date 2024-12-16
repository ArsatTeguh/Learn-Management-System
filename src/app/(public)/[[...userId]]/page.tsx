import React from 'react';
import Course from '../__components/course';
import PageCourse from '../__components/pageCourse';

function Dashboard({ params }: { params: { userId: string } }) {
  return (
    <div className="p-4">
      <Course />
      <PageCourse
        userId={Object.keys(params).length > 0 ? params.userId : ''}
      />
    </div>
  );
}

export default Dashboard;
