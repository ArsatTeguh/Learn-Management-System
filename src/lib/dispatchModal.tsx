import { setModal } from '@/state/modalSlice';
import { RootState } from '@/state/store';
import { useDispatch, useSelector } from 'react-redux';

function DispatchModal() {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.modal);
  const onModal = (action: boolean, href: string) => {
    dispatch(setModal({ isModal: action, href }));
  };
  return { onModal, modal };
}

export default DispatchModal;
