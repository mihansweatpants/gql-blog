import jwt from 'jsonwebtoken';

const TOKEN_LIFETIME = '1d';

export function generateToken(payload) {
  return jwt.sign(
    {
      ...payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_LIFETIME }
  );
}
