import mongoose from 'mongoose';
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId({ length: 3 });
const AuthSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => uid.randomUUID(),
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: false },
    role: { type: String, required: false, default: 'user' },
    isProfile: { type: Boolean, required: false, default: false },
  },
  { collection: 'auth' },
);

const AuthModel = mongoose.models.auth || mongoose.model('auth', AuthSchema);

export default AuthModel;
