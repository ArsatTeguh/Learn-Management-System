import { ChapterProps, PropsCourse } from '@/state/CourseSlice';

export function isAnyValueEmpty(data: PropsCourse): boolean {
  // Mengecek apakah ada nilai kosong pada properti properti string dalam objek
  const isEmptyString = (
    value: string | number | boolean | ChapterProps[],
  ): value is string => typeof value === 'string' && value.trim() === '';

  const isEmptyDate = (value: string | number | boolean): value is number => value as any;

  // Fungsi rekursif untuk memeriksa properti-properti dalam objek chapter
  const checkChapter = (chapters: ChapterProps[]): boolean => {
    // eslint-disable-next-line no-restricted-syntax
    for (const chapter of chapters) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key in chapter) {
        if (key === 'id') {
          // eslint-disable-next-line no-continue
          continue; // skip pengecekan untuk properti id
        }
        if (
          isEmptyString(chapter[key as keyof ChapterProps])
          && !isEmptyDate(chapter[key as keyof ChapterProps])
        ) {
          return true;
        }
      }
    }
    return false;
  };

  // Mengecek properti-properti dalam objek initialState
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const key in data) {
    const value = data[key as keyof PropsCourse];
    if (key === 'chapter') {
      if (Array.isArray(value) && value.length > 0) {
        if (checkChapter(value as ChapterProps[])) {
          return true;
        }
      }
    } else if (isEmptyString(value) && !isEmptyDate(value)) {
      return true;
    }
  }
  return false;
}
