import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PropsUser {
  profile: string;
  email: string;
  role: string;
  userId: string;
}

const initialState: PropsUser = {
  profile: '',
  email: '',
  role: '',
  userId: '',
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // onchange data input berdasarkan name input
    setUser: (state, action: PayloadAction<Partial<any>>) => {
      if (!action.payload) {
        return state;
      }
      const {
        profile,
        email,
        role,
        userId,
      } = action.payload!;
      return {
        profile,
        email,
        role,
        userId,
      };
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
