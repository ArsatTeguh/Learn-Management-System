import { ChapterProps } from '@/state/CourseSlice';
import React from 'react';

type Props = {
  id: number;
  handler: (id: number, key: keyof ChapterProps, value: string | number | boolean) => void;
  state: boolean
};

function Toggle({ id, handler, state } : Props) {
  return (
    <div className="form-control w-52">
      <label htmlFor="unLock" className="cursor-pointer label">
        <span className="label-text font-medium">Locked Chapter ?</span>
        <input checked={state} onChange={(e) => handler(id, 'unLock', e.target.checked)} name="unLock" type="checkbox" className="toggle toggle-primary" />
      </label>
    </div>
  );
}

export default Toggle;
