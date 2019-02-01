import express from 'express';

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import { Strategy as VKStrategy } from 'passport-vkontakte';

import { models } from '~/models';
import {
  generateToken,
  generateNonce,
  findOrCreateOauthUser,
} from '~/helpers/auth';

const router = express.Router();

let userId;
let reqId;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/oauth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile?.emails?.find(email => email.type === 'account')
        .value;
      const username = profile?.displayName;
      const avatar = profile?._json?.image?.url;

      const user = await findOrCreateOauthUser(models.User, {
        email,
        username,
        avatar,
      });

      userId = user.id;
      reqId = generateNonce();

      done(null, profile);
    }
  )
);

passport.use(
  new VKStrategy(
    {
      clientID: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET,
      callbackURL: '/oauth/vk/callback',
    },
    async (accessToken, refreshToken, params, profile, done) => {
      const email = params?.email;
      const username = profile?.displayName;
      const avatar = profile?._json?.photo;

      const user = await findOrCreateOauthUser(models.User, {
        email,
        username,
        avatar,
      });

      userId = user.id;
      reqId = generateNonce();

      done(null, user);
    }
  )
);

router.use(passport.initialize());

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) =>
    res.redirect(`${process.env.FRONTEND_URL}/oauth/?req_id=${reqId}`)
);

router.get(
  '/vk',
  passport.authenticate('vkontakte', { scope: ['profile', 'email'] })
);

router.get(
  '/vk/callback',
  passport.authenticate('vkontakte', { session: false }),
  (req, res) =>
    res.redirect(`${process.env.FRONTEND_URL}/oauth/?req_id=${reqId}`)
);

router.get('/:reqId', (req, res) => {
  if (req.params.reqId === reqId) {
    res.status(200).json({
      token: generateToken({ id: userId }),
    });
  } else {
    res.status(404).json({
      error: 'Not Found',
    });

    userId = null;
    reqId = null;
  }
});

export default router;
