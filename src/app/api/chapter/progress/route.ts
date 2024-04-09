import connectMongoDB from '@/lib/connectDb';
import verifyToken from '@/lib/jsonwebtoken';
import ProgressModel from '@/models/progress';
import { NextResponse } from 'next/server';

export async function POST(request: Request | any) {
  await connectMongoDB();
  try {
    await verifyToken(request);
    const { courseId, chapterId } = await request.json();
    const validationProgress = await ProgressModel.find({
      course_id: courseId,
      user_id: request.id,
    });

    if (validationProgress.length === 0) {
      return NextResponse.json(
        { message: 'Progress not found' },
        { status: 400 },
      );
    }
    // const newdata = validationProgress[0];

    // if (!newdata.progress) {
    //   console.log('true');
    //   newdata.progress = [];
    // }

    // const existChpaterIdFromProgress = newdata.progress.filter(
    //   (item: string) => item === chapterId,
    // );

    // if (existChpaterIdFromProgress.length === 0) {

    // }
    const result = await ProgressModel.findOneAndUpdate(
      { course_id: courseId, user_id: request.id },
      { $push: { progress: chapterId } },
      { new: true },
    );

    return NextResponse.json(
      { message: 'Success update progress', data: result },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
