import mongoose, { Document, Model } from 'mongoose';

interface IAction {
  isLike?: Array<string>;
  isDislike?: Array<string>;
  isComplete?: Boolean;
}

interface IComment {
  sender?: string;
  comment?: string;
}

interface IChapter {
  asset_id: string;
  playbackId: string;
  videoUrl: string;
  chapter: string;
  capter_desc: string;
  unLock: Boolean;
  action: IAction;
  comment: IComment[];
}

interface ICourse extends Document {
  id_teacher: string;
  thumbnail: string;
  title: string;
  category: string;
  price?: number;
  isFree: string;
  description: string;
  chapter_course: IChapter[];
  length_chapter: number;
  buyer_id?: string[];
  progress: number;
}

interface ICourseModel extends Model<ICourse> {}

const CourseSchema = new mongoose.Schema(
  {
    id_teacher: { type: String, required: true },
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: false },
    isFree: { type: Boolean, required: true },
    description: { type: String, required: true },
    chapter_course: { type: Array, required: true },
    length_chapter: { type: Number, required: true },
    buyer_id: { type: Array, required: false },
    progress_id: { type: mongoose.Schema.Types.ObjectId, ref: 'progress' },
  },
  { collection: 'course' },
);

const CourseModel: ICourseModel = mongoose.models.course || mongoose.model('course', CourseSchema);

export default CourseModel;
