import mongoose from 'mongoose';

const AuthSchema = new mongoose.Schema(
  {
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
