import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ChapterProps {
  id: number;
  videoUrl: string;
  chapter: string;
  capter_desc: string;
  unLock: boolean;
}

export interface PropsCourse {
  title: string,
  thumbnail: string;
  category: string;
  description: string;
  price: number;
  isFree: boolean,
  chapter: Array<ChapterProps>;
}

export const initialChapter = {
  id: Date.now(),
  videoUrl: '',
  chapter: '',
  capter_desc: '',
  unLock: false,
};

const initialState: PropsCourse = {
  title: '',
  thumbnail: '',
  category: 'Technology',
  description: '',
  price: 0,
  isFree: true,
  chapter: [initialChapter],
};

const CourseSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCourse: (state, action: PayloadAction<Partial<PropsCourse>>) => ({
      ...state,
      ...action.payload,
    }),

    // onchange data input berdasarkan name input
    addChapter: (state, action: PayloadAction<ChapterProps>) => {
      state.chapter.push(action.payload);
    },

    addImage: (state, action: PayloadAction<{ url :string }>) => {
      const { url } = action.payload;
      state.thumbnail = url;
    },

    changeisFree: (state, action: PayloadAction<boolean >) => {
      state.isFree = action.payload;
    },

    resetState: () => initialState,

    removeChapter: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      if (state.chapter.length > 1) {
        state.chapter = state.chapter.filter((item) => item.id !== id);
      }
    },

    changeChapter: (
      state,
      action: PayloadAction<{
        id: number;
        key: keyof ChapterProps;
        value: string | number | boolean; }>,
    ) => {
      const { id, key, value } = action.payload;
      state.chapter = state.chapter.map((chapterItem) => {
        if (chapterItem.id === id) {
          return {
            ...chapterItem,
            [key]: value,
          };
        }
        return chapterItem;
      });
    },
  },
});

export const {
  addChapter,
  removeChapter,
  changeChapter,
  setCourse,
  addImage,
  changeisFree,
  resetState,
} = CourseSlice.actions;

export default CourseSlice.reducer;
