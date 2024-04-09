import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface PropsModal {
  isModal: boolean;
  href: string;
}

const initialState: PropsModal = {
  isModal: false,
  href: '',
};

const ModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<PropsModal>) => {
      const { isModal, href } = action.payload;
      state.isModal = isModal;
      state.href = href;
    },
  },
});

export const { setModal } = ModalSlice.actions;

export default ModalSlice.reducer;
