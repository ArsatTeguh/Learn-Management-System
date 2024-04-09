import React from 'react';

interface Props {
  handler: (action: 'continue' | 'cancel') => void
}

function Modal({ handler }: Props) {
  return (
    <div className="lg:w-[500px] w-[400px] rounded shadow-lg border  h-auto bg-white">
      <div className="w-full h-full flex flex-col justify-center gap-8 pt-8">
        <p className="text-md font-medium text-zinc-800 text-center">
          Do You Want to Discard the Changes?
        </p>
        <div className="flex items-center gap-4 justify-end pb-4 px-8">
          <button
            onClick={() => handler('cancel')}
            type="button"
            className="py-2 px-6 rounded bg-white border shadow font-medium border-blue-600 text-blue-600"
          >
            Cancel
          </button>
          <button
            onClick={() => handler('continue')}
            type="button"
            className="py-2 px-8 rounded bg-blue-600 shadow font-medium text-white"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
