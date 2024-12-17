import verifyToken from '@/lib/jsonwebtoken';
import Midtrans from 'midtrans-client';
import { NextResponse } from 'next/server';

const snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

export async function POST(request: Request | any) {
  try {
    await verifyToken(request);
    const {
      id,
      productName,
      price,
      quantity,
    } = await request.json();

    const parameter = {
      item_details: {
        name: productName,
        price,
        quantity,
      },
      transaction_details: {
        order_id: `${id}*${request.id}`,
        gross_amount: price * quantity,
      },
      customer_details: {
        email: request.user,
      },
    };
    // Get token to midtrans via snap
    const token = await snap.createTransactionToken(parameter);
    // return token
    return NextResponse.json({ token }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status },
    );
  }
}
