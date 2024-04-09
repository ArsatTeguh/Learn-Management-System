import {
  UseFormRegister,
  FieldErrors,
  UseFormHandleSubmit,
} from 'react-hook-form';

export type PropsInput = {
  channel: string;
  teks: string;
  register?: any;
  place: string;
  errors?: any;
  type?: string;
};

export type Tinput = {
  email: string;
  password: string;
};

export type IPropsLogin = {
  register: UseFormRegister<Tinput>;
  errors: FieldErrors<Tinput>;
  handleSubmit: UseFormHandleSubmit<Tinput, undefined>;
};
