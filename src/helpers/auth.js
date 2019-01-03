import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

const TOKEN_LIFETIME = 1000 * 60 * 60 * 24;
const IS_SECURE = process.env.NODE_ENV === 'production';

/**
 * @param {*} payload - any object
 */
export function generateToken(payload) {
  return jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_LIFETIME }
  );
}

/**
 * @param {*} res - express response object
 * @param {string} token - generated token
 */
export function setCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: TOKEN_LIFETIME,
    secure: IS_SECURE,
  });
}

/**
 * @param {*} req - express request object
 * @param {*} User - user model
 */
export async function checkAuth(req, User) {
  try {
    const token = req?.cookies?.token || req?.headers?.authorization;

    if (!token) throw new Error('Must Authenticate');

    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.find({ where: id });

    if (!user) throw new Error('Invalid token');

    return user;
  } catch (err) {
    throw new AuthenticationError(err.message);
  }
}
