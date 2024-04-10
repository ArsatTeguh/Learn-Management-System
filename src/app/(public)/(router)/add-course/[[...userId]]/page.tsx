'use client';

import InputImage from '@/app/(public)/__components/input/inputImage';
import InputPrice from '@/app/(public)/__components/input/inputPrice';
import InputText from '@/app/(public)/__components/input/inputText';
import InputTextChapter from '@/app/(public)/__components/input/inputTextChapter';
import Select from '@/app/(public)/__components/input/select';
import Textarea from '@/app/(public)/__components/input/textarea';
import Toggle from '@/app/(public)/__components/input/toggle';
import Modal from '@/app/(public)/__components/modal';
import CustomeFetch from '@/lib/customeFetch';
import DispatchModal from '@/lib/dispatchModal';
import { isAnyValueEmpty } from '@/lib/isEmptyCourse';
import Toast from '@/lib/toast';
import {
  ChapterProps,
  addChapter,
  addImage,
  changeChapter,
  changeisFree,
  removeChapter,
  resetState,
  setCourse,
} from '@/state/CourseSlice';
import { RootState } from '@/state/store';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { GrChapterAdd } from 'react-icons/gr';
import { IoIosClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

function AddCourse() {
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const route = useRouter();

  const course = useSelector((state: RootState) => state.course);
  const { modal, onModal } = DispatchModal();
  const validateCourseForm = isAnyValueEmpty(course);
  const { Fetch } = CustomeFetch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement
  | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch(setCourse({ [name]: value }));
  };

  const handleMediaImage = (url: string) => {
    dispatch(addImage({ url }));
  };

  const handleIsfree = (isFree: boolean) => {
    dispatch(changeisFree(isFree));
  };

  const onActionModal = (action: 'continue' | 'cancel') => {
    if (action === 'continue') {
      onModal(false, '');
      dispatch(resetState());
      route.push(modal.href);
    } else {
      onModal(false, '');
    }
  };

  const handleChangeChapter = (
    id: number,
    key: keyof ChapterProps,
    value: string | number | boolean,
  ) => {
    dispatch(changeChapter({ id, key, value }));
  };

  const onAddChapter = () => dispatch(
    addChapter({
      id: Date.now(),
      videoUrl: '',
      chapter: '',
      capter_desc: '',
      unLock: true,
    }),
  );
  const onRemoveChapter = (id: number) => dispatch(removeChapter({ id }));

  const onSubmit = async () => {
    setloading(true);
    try {
      const response = await Fetch({ url: 'api/courseAll', method: 'POST', body: course });
      const result = await response?.json();
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        Toast({
          status: 'success',
          message: result.message,
        });
      }
    } catch (error: any) {
      Toast({
        status: 'error',
        message: error.message,
      });
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <div className="flex items-center">
        <h1 className="py-4 px-4 font-medium text-sky-700 text-xl">
          {' '}
          Add Course{' '}
        </h1>
        <span className="text-2xl text-sky-700">
          {' '}
          <GrChapterAdd />{' '}
        </span>
      </div>
      <div className="my-3 mx-4 grid lg:grid-cols-2 gap-x-8 gap-y-6">
        <div className=" flex flex-item flex-col gap-2">
          <InputImage
            media="image"
            setSelectedMedia={handleMediaImage}
            selectedMedia={course.thumbnail}
          />
          <InputText
            title="Course"
            name="title"
            handler={handleInputChange}
            state={course.title}
          />
          <Select
            title="Category"
            name="category"
            handler={handleInputChange}
            state={course.category}
          />
          <InputPrice
            handlerPrice={handleInputChange}
            handleIsFree={handleIsfree}
            statePrice={course.price}
            stateIsFree={course.isFree}
          />
          <Textarea
            title="Description"
            name="description"
            handler={handleInputChange}
            state={course.description}
          />
          <button
            disabled={validateCourseForm || loading}
            type="button"
            onClick={onSubmit}
            className="w-full disabled:bg-zinc-500 py-2 rounded mt-1 text-white bg-blue-600 font-medium"
          >
            Add Course
          </button>
        </div>
        <div className=" flex flex-col gap-2">
          {course.chapter.map((item: ChapterProps, index: number) => (
            <div
              key={item.id}
              className="relative flex flex-item flex-col gap-2 bg-slate-100/50 px-4 pt-10 pb-4 rounded-md"
            >
              <InputImage media="video" id={item.id} setSelectedMedia={handleChangeChapter} selectedMedia={item.videoUrl} />
              <InputTextChapter
                title="Chapter"
                name="chapter"
                handler={handleChangeChapter}
                id={item.id}
                state={item.chapter}
              />
              <InputTextChapter
                title="Description"
                name="capter_desc"
                handler={handleChangeChapter}
                id={item.id}
                state={item.capter_desc}
              />
              {index !== 0 && !course.isFree && (
                <Toggle id={item.id} handler={handleChangeChapter} state={item.unLock} />
              )}
              {index !== 0 && (
                <span
                  className="absolute top-0 right-2 text-3xl cursor-pointer"
                  onClick={() => onRemoveChapter(item.id)}
                >
                  <IoIosClose />
                </span>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={onAddChapter}
            className="w-full py-2 rounded mt-1 text-zinc-900 border border-slate-200 bg-slate-100  font-medium"
          >
            Chapter +{' '}
          </button>
        </div>
        <div
          className={`fixed w-full top-0 !z-30 left-0 h-screen  ${
            modal.isModal ? 'block' : 'hidden'
          }`}
        >
          <span className="block w-full h-full  bg-black opacity-50" />
          <div className="w-full absolute h-full top-1/4 left-10 xl:left-1/3 !z-50">
            <Modal handler={onActionModal} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
