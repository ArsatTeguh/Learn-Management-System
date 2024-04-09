import connectMongoDB from '@/lib/connectDb';
import verifyToken from '@/lib/jsonwebtoken';
import CourseModel from '@/models/course';
import Mux from '@mux/mux-node';
import { NextResponse } from 'next/server';

const utilsChapter = {
  action: {
    isLike: [],
    isDislike: [],
    isComplete: false,
  },
  comment: [],
};

async function CreateAssets(chapter: any[]) {
  const mux = new Mux({
    tokenId: process.env.MUX_ACCESS_TOKEN_ID!,
    tokenSecret: process.env.MUX_SCRET_KEY!,
  });
  const newChapter = await Promise.all(
    chapter.map(async (item: any) => {
      const asset = await mux.video.assets.create({
        input: item.videoUrl,
        playback_policy: ['public'],
        test: false,
      });
      const newObj = {
        asset_id: asset.id,
        playbackId: asset.playback_ids?.[0]?.id,
        ...utilsChapter,
        ...item,
      };
      delete newObj?.id;
      return newObj;
    }),
  );
  return newChapter;
}

export async function POST(request: Request | any) {
  await connectMongoDB();
  try {
    await verifyToken(request);
    const body = await request.json();
    const { chapter } = body;

    const newChapter = await CreateAssets(chapter)
      .then((res: any) => res)
      .catch((error: any) => {
        console.error('Terjadi kesalahan dalam membuat asset:', error);
      });
    body.chapter = newChapter;

    const chapterLength = body.chapter.length;

    const course = new CourseModel({
      id_teacher: request.id,
      thumbnail: body.thumbnail,
      title: body.title,
      category: body.category,
      price: body.price,
      isFree: body.isFree,
      description: body.description,
      chapter_course: newChapter,
      length_chapter: Number(chapterLength),
    });

    await course.save();

    return NextResponse.json(
      { message: 'Success Created Course', data: course },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}

export async function GET() {
  await connectMongoDB();
  try {
    const data = await CourseModel.find();
    return NextResponse.json(
      { message: 'Success Get All Course', data: { data } },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
