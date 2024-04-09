import mongoose from 'mongoose';

const Progresschema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'auth' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'course' },
    progress: { type: Array, required: false },
  },
  { collection: 'progress' },
);

const ProgressModel = mongoose.models.progress || mongoose.model('progress', Progresschema);

export default ProgressModel;
