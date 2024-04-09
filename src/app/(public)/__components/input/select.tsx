import React from 'react';

type Props = {
  title: string;
  handler: (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement | HTMLSelectElement>) => void;
  state: string;
  name: string;
};

function Select({
  title,
  handler,
  state,
  name,
}: Props) {
  return (
    <select
      className="select select-bordered w-full border-zinc-500 focus:outline-none"
      value={state}
      onChange={handler}
      name={name}
    >
      <option disabled value="">
        {title}
      </option>
      <option value="Technology">Technology</option>
      <option value="Cook">Cook</option>
      <option value="Sains">Sains</option>
      <option value="Video Grapher">Video Grapher</option>
      <option value="Sosial media">Sosial media</option>
    </select>
  );
}

export default Select;
