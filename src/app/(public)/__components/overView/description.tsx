import React from 'react';
import { FaCheck } from 'react-icons/fa6';

function Description() {
  return (
    <div className="lg:w-[47vw] w-full h-full p-4 flex flex-col gap-6  border text-zinc-700 border-zinc-300">
      <p className="font-semibold text-xl">Yang akan Anda pelajari</p>

      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex items-start gap-4">
            <span>
              <FaCheck />
            </span>
            <p>
              Kamu akan mempelajari standar kerja menggunakan Python ke
              perusahaan luar negeri secara remote
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span>
              <FaCheck />
            </span>
            <p>
              Kamu akan mempelajari standar kerja menggunakan Python ke
              perusahaan luar negeri secara remote
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div className="flex items-start gap-4">
            <span>
              <FaCheck />
            </span>
            <p>
              Course ini akan memberikanmu fundamentasi skill Python yang secara
              akurat akan berguna bagimu untuk menembus job-job remote work di
              Upwork
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span>
              <FaCheck />
            </span>
            <p>Memperkenalkanmu dengan algoritma pemrograman komputer</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
