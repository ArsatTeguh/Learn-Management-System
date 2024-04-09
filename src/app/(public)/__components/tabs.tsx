import React from 'react';

const listTabs = [
  {
    name: 'all',
    params: '',
  },
  {
    name: 'Technology',
    params: '1',
  },
  {
    name: 'Cook',
    params: '2',
  },
  {
    name: 'Sains',
    params: '3',
  },
  {
    name: 'Video Grapher',
    params: '4',
  },
  {
    name: 'Sosial Media',
    params: '5',
  },
];

function Tabs({ onparams, params }: { onparams: (props: string) => void, params : string }) {
  return (
    <div className="flex item-center gap-3 flex-wrap">
      {listTabs.map((item) => (
        <button
          onClick={() => onparams(item.params)}
          key={item.name}
          type="button"
          className={`px-4 hover:bg-zinc-500/20 rounded-md  text-xs py-2 font-medium transition-all  ${params === item.params ? 'bg-sky-300/20  text-sky-700' : 'bg-slate-300/20'}`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
