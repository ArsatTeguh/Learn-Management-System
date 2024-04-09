import { toast } from 'react-toastify';

type Props = {
  status: 'error' | 'success';
  position?: 'top-center' | 'top-right';
  message: string;
};

const Toast = ({ status, position, message }: Props) => {
  if (status === 'error') {
    return toast.error(message, {
      position: position ?? 'top-center',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  } if (status === 'success') {
    return toast.success(message, {
      position: position ?? 'top-center',
      autoClose: 3500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  }
};

export default Toast;
