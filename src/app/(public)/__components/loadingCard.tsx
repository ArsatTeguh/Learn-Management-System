import React from 'react';

function LoadingCard() {
  return (
    <div
      // eslint-disable-next-line no-underscore-dangle
      className="card  lg:w-80 w-[21rem] bg-white"
    >
      <span className="block lg:h-[200px] w-full skeleton" />
      <div className="flex flex-col gap-3 px-3 py-3">
        <span className="h-5 w-40 rounded-full block bg-zinc-200" />
        <div className="flex items-center gap-2 w-full">
          <span className="w-8 h-8 flex bg-zinc-200 rounded-full" />
          <span className="h-3 w-20 rounded-full block bg-zinc-200" />
        </div>
        <span className="h-3 w-28 rounded-full block bg-zinc-200" />
      </div>
    </div>
  );
}

export default LoadingCard;
