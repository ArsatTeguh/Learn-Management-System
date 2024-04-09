import React from 'react';
import InputText from './inputText';

type Props = {
  statePrice: number;
  stateIsFree: boolean;
  handlerPrice: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleIsFree: (isFree: boolean) => void;
};

function InputPrice({
  statePrice,
  stateIsFree,
  handlerPrice,
  handleIsFree,
}: Props) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="form-control w-52">
        <label htmlFor="isFree" className="cursor-pointer label">
          <span className="label-text font-medium">Free Course ?</span>
          <input
            checked={stateIsFree}
            onChange={(e) => handleIsFree(e.target.checked)}
            name="isFree"
            type="checkbox"
            className="toggle toggle-primary"
          />
        </label>
      </div>
      {!stateIsFree && (
        <div className="w-full">
          <InputText
            title="Price"
            name="price"
            handler={handlerPrice}
            state={statePrice}
          />
        </div>
      )}
    </div>
  );
}

export default InputPrice;
