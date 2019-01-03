import jwt from 'jsonwebtoken';

const TOKEN_LIFETIME = '1d';

const IS_SECURE = process.env.NODE_ENV === 'production';
const COOKIE_LIFETIME = 1000 * 60 * 60 * 24;

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
    maxAge: COOKIE_LIFETIME,
    secure: IS_SECURE,
  });
}

/**
 * @param {*} req - express request object
 * @param {*} User - user model
 */
export async function checkAuth(req, User) {
  const token = req?.cookies?.token || req?.headers?.authorization;

  console.log({ token });

  if (token) {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.find({ where: id });

    if (!user) throw new Error('Unauthorized');

    return user;
  }
}

export class AuthorizationError extends Error {
  constructor(...args) {
    super(...args);
    this.name = "Authorization error";
    this.code = 401;
    Error.captureStackTrace(this, AuthorizationError)
  }
}
