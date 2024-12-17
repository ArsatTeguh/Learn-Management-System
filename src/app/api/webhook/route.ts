import connectMongoDB from '@/lib/connectDb';
import CourseModel from '@/models/course';
import ProgressModel from '@/models/progress';
import { NextResponse } from 'next/server';

export async function POST(request: Request | any) {
  await connectMongoDB();
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { transactionStatus, fraudStatus, order_id } = await request.json();
    const [courseId, userId] = order_id.split('*');

    if (transactionStatus === 'settlement') {
      if (fraudStatus === 'accept') {
        await CourseModel.updateOne(
          { _id: courseId },
          { $push: { buyer_id: userId } },
        );

        const progress = new ProgressModel({
          user_id: userId,
          course_id: courseId,
        });
        await progress.save();
      }
    }

    return NextResponse.json({
      message: `${courseId} dan ${userId}`,
      status: transactionStatus,
      fraud: fraudStatus,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      courseUpdateError: true,
    }, { status: error.status || 500 });
  }
}
