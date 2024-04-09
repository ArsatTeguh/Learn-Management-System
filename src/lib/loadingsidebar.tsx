import React from 'react';

function Loadingsidebar() {
  return (
    <div className=" p-4 w-full mx-auto flex flex-col gap-6 mt-4">
      <div className="animate-pulse flex space-x-4">
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-4 bg-slate-200 rounded col-span-1" />
          <div className="h-4 bg-slate-200 rounded col-span-2" />
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-4 bg-slate-200 rounded col-span-1" />
          <div className="h-4 bg-slate-200 rounded col-span-2" />
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-4 bg-slate-200 rounded col-span-1" />
          <div className="h-4 bg-slate-200 rounded col-span-2" />
        </div>
      </div>
      <div className="animate-pulse flex space-x-4">
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="h-4 bg-slate-200 rounded col-span-1" />
          <div className="h-4 bg-slate-200 rounded col-span-2" />
        </div>
      </div>
    </div>
  );
}

export default Loadingsidebar;
