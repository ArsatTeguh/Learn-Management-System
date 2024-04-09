'use client';

import React, { useState } from 'react';
import Tabs from './tabs';

function Course() {
  const [params, setParams] = useState<string>('');
  const onparams = (props: string) => setParams(props);
  return (
    <div>
      <div className="">
        <Tabs onparams={onparams} params={params} />
      </div>
      {params}
    </div>
  );
}

export default Course;
