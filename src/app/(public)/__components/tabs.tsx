import React from 'react';

const listTabs = [
  {
    name: 'All',
    params: '',
  },
  {
    name: 'Technology',
    params: 'technology',
  },
  {
    name: 'Cook',
    params: 'cook',
  },
  {
    name: 'Sains',
    params: 'sains',
  },
  {
    name: 'Video Grapher',
    params: 'video-grapher',
  },
  {
    name: 'Sosial Media',
    params: 'sosial-media',
  },
];

function Tabs({ params, createQueryString }: {
  createQueryString: (name: string, value: string) => void, params : string }) {
  return (
    <div className="flex item-center gap-3 flex-wrap">
      {listTabs.map((item) => (
        <button
          onClick={() => createQueryString('category', item.params)}
          key={item.name}
          type="button"
          className={`px-4 hover:bg-zinc-500/20 rounded-md  text-xs py-2 font-medium transition-all  ${params === item.params ? 'bg-sky-300/20  text-sky-700' : 'bg-slate-300/20 text-zinc-500'}`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
