// eslint-disable-next-line import/no-cycle
import { UserProps } from '@/components/navbar';
import jwt from 'jsonwebtoken';

export function getToken({ token }: { token: string }) {
  // const token = document?.cookie
  //   ?.split('; ')
  //   ?.find((row) => row.startsWith('token='))
  //   ?.split('=')[1];

  if (token) {
    const decoded = jwt.decode(token);
    return decoded as UserProps;
  }
  return null;
}
