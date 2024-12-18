import connectMongoDB from '@/lib/connectDb';
import CourseModel from '@/models/course';
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

    const isBuyer = existCourse.buyer_id?.filter((buyerId: string) => buyerId === userId);

    if (isBuyer?.length! > 0) {
      return NextResponse.json(
        { message: 'Ok' },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: 'Course no User' },
      { status: 400 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
