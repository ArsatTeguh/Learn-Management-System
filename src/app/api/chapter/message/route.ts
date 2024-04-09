import connectMongoDB from '@/lib/connectDb';
import verifyToken from '@/lib/jsonwebtoken';
import CourseModel from '@/models/course';
import { NextResponse } from 'next/server';

export async function POST(request: Request | any) {
  await connectMongoDB();
  try {
    await verifyToken(request);
    const { courseId, chapterId, data } = await request.json();

    const existCourse = await CourseModel.findById(courseId);

    if (!existCourse) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 400 },
      );
    }
    // eslint-disable-next-line max-len
    const condistionLike = existCourse.chapter_course[
      chapterId
    ]?.action.isLike!.includes(request.id);
    // // eslint-disable-next-line max-len
    const condistionDisLike = existCourse.chapter_course[
      chapterId
    ]?.action.isDislike!.includes(request.id);

    if (!condistionLike && data.like) {
      await CourseModel.updateOne(
        { _id: courseId },
        { $push: { [`chapter_course.${chapterId}.action.isLike`]: request.id } },
      );
    }

    if (condistionLike && data.like) {
      await CourseModel.updateOne(
        { _id: courseId },
        { $pull: { [`chapter_course.${chapterId}.action.isLike`]: request.id } },
      );
    }

    if (!condistionDisLike && data.dislike) {
      await CourseModel.updateOne(
        { _id: courseId },
        { $push: { [`chapter_course.${chapterId}.action.isDislike`]: request.id } },
      );
    }

    if (condistionDisLike && data.dislike) {
      await CourseModel.updateOne(
        { _id: courseId },
        { $pull: { [`chapter_course.${chapterId}.action.isDislike`]: request.id } },
      );
    }

    if (data.message !== '' && data.name !== '') {
      await CourseModel.updateOne(
        { _id: courseId },
        { $push: { [`chapter_course.${chapterId}.comment`]: { user: data.name, message: data.message } } },
      );
    }

    return NextResponse.json(
      { message: 'Success update Action' },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
