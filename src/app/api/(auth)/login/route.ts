import AuthModel from '@/models/auth';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/connectDb';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  await connectMongoDB();
  try {
    const user: { email: string; password: string } = await request.json();

    if (!user) {
      return NextResponse.json(
        { message: 'should data is not empty' },
        { status: 400 },
      );
    }

    const currentUser = await AuthModel.findOne({ email: user.email });

    if (!currentUser) {
      return NextResponse.json(
        { message: 'Email is not valid' },
        { status: 400 },
      );
    }

    const passwordMatch = await compare(user.password, currentUser.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 400 },
      );
    }

    const token = jwt.sign(
      {
        email: currentUser.email,
        profile: currentUser.image,
        role: currentUser.role,
        userId: currentUser.id,
      },
      process.env.SCRET as string,
      {
        expiresIn: '1 day', // Token kedaluwarsa dalam 1 hari
      },
    );

    cookies().set({
      name: 'token',
      value: token,
      httpOnly: false,
      path: '/',
      domain: process.env.NODE_ENV !== 'development' ? 'localhost:3000' : 'learn-management-system-one.vercel.app',
      maxAge: 86400,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
    });

    return NextResponse.json(
      {
        message: 'Login Success',
        data: {
          email: currentUser.email,
          profile: currentUser.image,
          role: currentUser.role,
          userId: currentUser.id,
        },
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Internal Server Error', error: error?.message },
      { status: 500 },
    );
  }
}
