import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { cookies } from 'next/headers';

const f = createUploadthing();

const auth = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) throw new Error('Unathorization');
  return token;
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: '4MB', maxFileCount: 1 } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: '1024MB' } })
    .middleware(() => auth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
