import React from 'react';

type Props = {
  title: string;
  handler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  state: string | number
  name: string
  // eslint-disable-next-line react/require-default-props
  type?: string
};

function InputText({
  title,
  handler,
  state,
  name,
  type = 'text',
}: Props) {
  return (
    <input
      name={name}
      type={type}
      value={state}
      placeholder={title}
      onChange={handler}
      className="input input-bordered placeholder:text-md border-zinc-500 focus:outline-none w-full"
    />
  );
}

export default InputText;
