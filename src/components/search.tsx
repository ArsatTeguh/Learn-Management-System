'use client';

import { IoSearchOutline } from 'react-icons/io5';
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { TypeCourse } from '@/lib/typeCourse';
import Toast from '@/lib/toast';

function Search({ userId }: { userId: string }) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<Array<TypeCourse>>([]);
  const [list, setList] = useState<Array<TypeCourse>>([]);
  const router = useRouter();
  const pathname = usePathname();
  const handleSearch = (event: any) => {
    const { value } = event.target;
    setSearchTerm(value);
    if (value.trim() !== '') {
      const filteredResults: Array<TypeCourse> = list?.filter(
        (item) =>
          // eslint-disable-next-line implicit-arrow-linebreak, @typescript-eslint/comma-dangle
          item?.title?.toLowerCase().includes(value.toLowerCase()),
        // eslint-disable-next-line function-paren-newline
      );
      setResults(filteredResults as Array<TypeCourse>);
    }
  };

  const onNavigate = (res: string) => {
    if (pathname.startsWith('/over-view')) {
      window.location.href = `/over-view/${res}/${userId}`;
    } else {
      router.push(`/over-view/${res}/${userId}`);
    }

    setSearchTerm('');
  };

  async function getList() {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/courseAll`,
      );
      const result = await data.json();
      setList(result.data);
    } catch (error: any) {
      Toast({ status: 'error', message: error.message });
    }
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="relative w-full h-full pt-5">
      <div className="w-full h-full relative">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          className="rounded-md border-[1px] outline-none border-zinc-200  w-full pl-4 py-2"
          onChange={handleSearch}
        />
        <span className="absolute right-3 top-[.6rem] text-2xl text-zinc-500">
          {' '}
          <IoSearchOutline />
        </span>
      </div>
      {searchTerm && (
        <ul className="fixed bg-white text-zinc-700 border -mt-3 w-[43%] rounded shadow-lg z-20">
          {results.length > 0 ? (
            results.map((item) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                // eslint-disable-next-line no-underscore-dangle
                key={item._id}
                className="p-2 hover:bg-slate-300/20 cursor-pointer"
                // eslint-disable-next-line no-underscore-dangle
                onClick={() => onNavigate(item._id)}
              >
                {item.title}
              </li>
            ))
          ) : (
            <li className="p-2">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Search;
