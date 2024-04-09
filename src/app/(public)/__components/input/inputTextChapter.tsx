import { ChapterProps } from '@/state/CourseSlice';
import React from 'react';

type Props = {
  id: number
  title: string
  handler: (id: number, key: keyof ChapterProps, value: string | number) => void;
  name: 'chapter' | 'capter_desc';
  state: string
};

function InputTextChapter({
  id,
  title,
  handler,
  name,
  state,
}: Props) {
  return (
    <input
      name={name}
      type="text"
      value={state}
      placeholder={title}
      onChange={(e) => handler(id, name, e.target.value)}
      className="input input-bordered border-zinc-500 focus:outline-none w-full"
    />
  );
}

export default InputTextChapter;
