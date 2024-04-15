import React from 'react';

type Props = {
  href: string;
  icon: any;
  title: string;
  role: string;
  navigate: (url:string) => void
  pathname: string
};

function ItemSidebar({
  href,
  icon,
  title,
  role,
  navigate,
  pathname,
}: Props) {
  const isActive = (pathname === '/' && href === '/')
    || pathname === href
    || pathname?.startsWith(`${href}/`);

  return (
    <div
      onClick={() => navigate(href)}
      className={`${role === 'teacher' && ' border border-bg-sky-200/20 text-sky-600'
      } flex items-center gap-2 px-3 py-3 rounded-md  cursor-pointer transition-all  text-md ${
        isActive
          ? 'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 font-medium'
          : 'hover:bg-slate-300/20 hover:text-slate-600 text-slate-500'
      }`}
      key={href}
    >
      <span className="font-medium text-xl">
        {icon}
      </span>
      <span>{title}</span>
    </div>
  );
}

export default ItemSidebar;
