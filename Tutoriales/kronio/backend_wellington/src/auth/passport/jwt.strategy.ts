import * as passport from 'passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';

import { UserService } from '@app/user/user.service';
import { environment } from '@env/environment.dev';

@Injectable()
export class JwtStrategy extends Strategy {
	constructor(private readonly userService: UserService) {
		super(
			{
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
				passReqToCallback: true,
				secretOrKey: environment.SECRET_KEY,
			},
			async (req, payload, next) => await this.verify(req, payload, next),
		);
		passport.use(this);
	}

	public async verify(req, payload, done) {
		return await this.userService
			.findOne({ id: payload.sub })
			.then(signedUser => done(null, signedUser))
			.catch(err => done('Invalid authorization', false));
	}
}
