import connectMongoDB from '@/lib/connectDb';
import CourseModel from '@/models/course';
import ProgressModel from '@/models/progress';
import { NextResponse } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: { slug: [string, string] } },
) {
  await connectMongoDB();
  try {
    const [courseId, userId = ''] = params.slug;

    const existCourse = await CourseModel.findById(courseId);
    if (!existCourse) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 400 },
      );
    }

    const { isFree } = existCourse;
    const progress = await ProgressModel.find({ course_id: courseId });

    if (progress.length === 0 && !isFree) {
      return NextResponse.json(
        { message: 'Course no User', data: { course: existCourse, progress: [] } },
        { status: 200 },
      );
    }

    const isBuyer = existCourse.buyer_id?.filter((buyerId: string) => buyerId === userId);
    const newprogress = progress?.filter((item) => item.user_id.equals(userId));

    // Jika course yang dipanggil berstatus Free maka langung buatkan table progress
    if (isFree && userId !== '') {
      if (newprogress.length === 0) {
        const Newprogress = new ProgressModel({
          user_id: userId,
          course_id: courseId,
        });
        await Newprogress.save();
      }
    }

    if (isBuyer?.length! > 0 || isFree) {
      const newexistCourse = existCourse;
      const unLockChapter = newexistCourse.chapter_course.map((item) => ({
        ...item,
        unLock: false,
      }));

      newexistCourse.chapter_course = unLockChapter;
      const data = {
        course: newexistCourse,
        progress: newprogress,
      };
      return NextResponse.json(
        { message: 'Success Get Chapter', data },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: 'Course no User', data: { course: existCourse, progress: [] } },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
