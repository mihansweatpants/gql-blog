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
