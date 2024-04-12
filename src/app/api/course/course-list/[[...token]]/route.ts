import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const teacher = (url: string) => [
  {
    title: 'Add Course',
    href: `/add-course/${url}`,
    role: 'teacher',
  },
];

const list = (url: string) => [
  {
    title: 'Browse',
    href: `/${url}`,
    role: 'user',
  },
  {
    title: 'Events',
    href: `/signin/${url}`,
    role: 'user',
  },
  {
    title: 'Discord',
    href: '/discord',
    role: 'user',
  },
  {
    title: 'Problems',
    href: '/problems',
    role: 'user',
  },
];

export async function GET(
  _request: Request,
  { params }: { params: { token: string[] } },
) {
  try {
    const user = params?.token[0];
    const listNoUser = list('');

    if (user === 'undefined') {
      return NextResponse.json(
        { message: 'Sidebar not teacher', data: listNoUser },
        { status: 200 },
      );
    }

    const decoded = jwt.verify(user, process.env.SCRET as string) as jwt.JwtPayload;
    if (decoded.role === 'teacher') {
      const listTeacher = teacher(decoded.userId);
      const listDefault = list(decoded.userId);
      const teacherList = [...listTeacher, ...listDefault];
      return NextResponse.json(
        { message: 'Sidebar with teacher', data: teacherList },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: 'Sidebar not teacher', data: listNoUser },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 },
    );
  }
}
