import * as passport from 'passport';

import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

import { User } from '@app/user/user.entity';

@Injectable()
export class LogInMiddleware implements NestMiddleware {
	async use(req: any, res: any, next: any) {
		return await passport.authenticate('local', { session: false }, (err, user, info) => {
			if (typeof info !== 'undefined') {
				next(new UnauthorizedException(info.message));
			} else if (err) {
				next(err);
			} else {
				req.user = new User(user);
				next();
			}
		})(req, res, next);
	}
}
