import { sign } from 'jsonwebtoken';
import { User } from './entity/User';
import 'dotenv/config';
import { Response } from 'express';

export const createAccessToken = (user: User) => {
	return sign({ userId: user.id }, process.env.ACCESS_TOKEN!, {
		expiresIn: '60m',
	});
};

export const createRefreshToken = (user: User) => {
	return sign({ userId: user.id }, process.env.REFRESH_TOKEN!, {
		expiresIn: '30d',
	});
};

export const sendRefreshToken = (res: Response, token: string) => {
	res.cookie('jid', token, {
		httpOnly: true,
		path: '/refresh_token',
	});
};
