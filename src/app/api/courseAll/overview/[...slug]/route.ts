import connectMongoDB from '@/lib/connectDb';
import { TypeCourse } from '@/lib/typeCourse';
import CourseModel from '@/models/course';
import { isValidObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { slug: [string, string] } },
) {
  try {
    await connectMongoDB();
    const { slug } = params;

    if (!isValidObjectId(slug[0])) {
      return NextResponse.json(
        { message: 'course id invalidate' },
        { status: 400 },
      );
    }

    const result: TypeCourse | null = await CourseModel.findOne({
      _id: params.slug[0],
    });

    if (!result) {
      return NextResponse.json({ message: 'data undefined' }, { status: 400 });
    }

    const isBuyer = result.buyer_id.includes(slug[1]);
    const players = result.buyer_id.length;
    const format = {
      isLock: !(result.isFree || isBuyer),
      title: result.title,
      thumbnail: result.thumbnail,
      description: result.description,
      players,
      videoUrl: result.chapter_course[0].playbackId,
      price: result.price,
      client_id: slug[1] === 'undefined' ? null : slug[1],
      courseId: slug[0],
    };
    return NextResponse.json({ data: format }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
