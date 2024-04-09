import { isAnyValueEmpty } from '@/lib/isEmptyCourse';
import { PropsUser } from '@/state/userSlice';

test('mengembalikan true jika salah satu value kosong', () => {
  const initialState: PropsUser = {
    title: 'abc',
    thumbnail: 'abc',
    category: 'abc',
    description: 'abc',
    price: '',
    chapter: [
      {
        id: new Date(),
        videoUrl: 'abc',
        chapter: '',
        description: 'abc',
        unLock: false,
      },
    ],
  };
  const initialState1: PropsUser = {
    title: 'abc',
    thumbnail: 'abc',
    category: 'abc',
    description: 'abc',
    price: 'abc',
    chapter: [
      {
        id: new Date(),
        videoUrl: 'abc',
        chapter: '',
        description: 'abc',
        unLock: false,
      },
    ],
  };

  const validationform1 = isAnyValueEmpty(initialState);
  const validationform2 = isAnyValueEmpty(initialState1);
  expect(validationform1).toBe(true);
  expect(validationform2).toBe(true);
});

test('mengembalikan false jika semua value terisi', () => {
  const initialState: PropsUser = {
    title: 'abc',
    thumbnail: 'abc',
    category: 'abc',
    description: 'abc',
    price: 'abc',
    chapter: [
      {
        id: new Date(),
        videoUrl: 'abc',
        chapter: 'abc',
        description: 'abc',
        unLock: false,
      },
    ],
  };

  const validationform1 = isAnyValueEmpty(initialState);
  expect(validationform1).toBe(false);
});
