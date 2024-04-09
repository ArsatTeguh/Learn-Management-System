import jwt, { JwtPayload } from 'jsonwebtoken';

const verifyToken = (req: any) => new Promise<void>((resolve, reject) => {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    // eslint-disable-next-line no-promise-executor-return, prefer-promise-reject-errors
    return reject({ status: 401, message: 'Token Not Found' });
  }

  try {
    const decode: JwtPayload | any = jwt.verify(token, process.env.SCRET as string);
    req.user = decode?.email; // Menambahkan data user ke request
    req.id = decode?.userId;
    resolve();
  } catch (error: any) {
    // eslint-disable-next-line prefer-promise-reject-errors
    reject({ status: 401, message: 'Token Invalid' });
  }
});

export default verifyToken;
