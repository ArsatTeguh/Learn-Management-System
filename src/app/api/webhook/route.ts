import connectMongoDB from '@/lib/connectDb';
import CourseModel from '@/models/course';
import ProgressModel from '@/models/progress';
import { NextResponse } from 'next/server';

export async function POST(request: Request | any) {
  await connectMongoDB();
  try {
    const body = await request.json();
    const transactionStatus = body.transaction_status;
    const fraudStatus = body.fraud_status;
    const detailsUser = body.order_id.split('-');
    const courseId = detailsUser[0];
    const userId = detailsUser[1];

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

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
