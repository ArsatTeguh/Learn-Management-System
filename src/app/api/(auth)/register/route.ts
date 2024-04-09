import connectMongoDB from '@/lib/connectDb';
import { isPasswordValid } from '@/lib/validatePassword';
import AuthModel from '@/models/auth';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';

const image = 'https://files.edgestore.dev/54ficg06zddgugsq/publicFiles/_public/155501a2-5ab2-4039-b04f-cd2e37c05090.png';

export async function POST(request: Request) {
  await connectMongoDB();
  try {
    const user: { email: string; password: string; repeatPassword: string } = await request.json();
    if (!user.email || !user.password || !user.repeatPassword) {
      return NextResponse.json(
        { message: 'Should data not be empty' },
        { status: 400 },
      );
    }

    if (user.password !== user.repeatPassword) {
      return NextResponse.json(
        { message: 'Password and Repeat Password do not match' },
        { status: 400 },
      );
    }

    if (!isPasswordValid(user.password)) {
      return NextResponse.json(
        {
          message:
            'Passwords must have 6 characters and symbols are prohibited',
        },
        { status: 400 },
      );
    }
    const currentUser = await AuthModel.findOne({ email: user.email });

    if (currentUser) {
      return NextResponse.json({ message: 'Email is Ready' }, { status: 400 });
    }

    const hashPassword = await hash(user.password, 10);
    const newAuth = new AuthModel({
      image,
      email: user.email,
      password: hashPassword,
    });

    await newAuth.save(); // save to database
    return NextResponse.json({ message: 'Success created acount' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
