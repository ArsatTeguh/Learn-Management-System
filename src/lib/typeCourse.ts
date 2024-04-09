export interface API {
  message: string;
  data: TypeCourse[];
}

export interface TypeCourse {
  _id: string;
  id_teacher: string;
  thumbnail: string;
  title: string;
  category: string;
  price: number;
  isFree: boolean;
  description: string;
  chapter_course: ChapterCourse[];
  length_chapter: number;
  buyer_id: any[];
  __v: number;
  progress_id: string;
  progress: Progress[];
}

export interface ChapterCourse {
  asset_id: string;
  playbackId: string;
  action: Action;
  comment: any[];
  videoUrl: string;
  chapter: string;
  capter_desc: string;
  unLock: boolean;
}

export interface Action {
  isLike: any[];
  isDislike: any[];
  isComplete: boolean;
}

export interface Progress {
  _id: string;
  user_id: string;
  progress: number;
  __v: number;
}
