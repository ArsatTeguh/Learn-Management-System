import React from 'react';

type Props = {
  title: string;
  handler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  state: string
  name: string
};

function Textarea({
  title,
  state,
  handler,
  name,
}: Props) {
  return (
    <textarea
      name={name}
      value={state}
      onChange={handler}
      className="textarea textarea-bordered border-zinc-500 focus:outline-none"
      placeholder={title}
    />
  );
}

export default Textarea;
