
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserRole, UserStatus, InvitationUser, InvitationStatus } from '@app/user/user.entity';
import { Error } from '@app/base.entity';
import { ChangePasswordCmd } from '@app/user/cmd/change-password.cmd';
import { environment } from '@env/environment.dev';

import { TokenDto } from './dto/token.dto';
import { TokenUserPayload } from './dto/token-user-payload.dto';
import { UserDTO } from './dto/user.dto';

import * as jwt from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
	constructor() {}

	public async signUp(user: User) {
		if (await InvitationUser.count({where : {email: user.username, status: InvitationStatus.CONFIRM}}) > 0) {
			const error = new Error();
			error.target = {};
			error.value = 'Email error';
			error.property = 'username';
			error.children = [];
			error.constraints = {
				username: 'Exist User with same email as usernamer',
			};
			return [error];
		}
		if (await InvitationUser.count({where : {email: user.username, status: InvitationStatus.PENDING}}) === 0) {
			user.role = UserRole.USER;
			user.status = UserStatus.PENDING;
			await user.set_password(user.password);
			user.save();
			if (user.errors) {
				return user.errors;
			}
		} else {
			const invitationUser = await InvitationUser.findOne({where : {email: user.username, status: InvitationStatus.PENDING},
			relations: ['User']});
			user = invitationUser.User;
		}
		const invitation = new InvitationUser(user);
		invitation.email = user.username;
		await invitation.save().then(() => {
			const transporter = nodemailer.createTransport(environment.MAILER_TRANSPORT);
			transporter.sendMail({
				from: '"Takion" <admin@takionsoft.com>',
				to: user.username,
				subject: 'Welcome',
				text: 'Welcome',
				html: `
					<b>Welcome to Takion</b></br>
					<h4>Code access: <b>${invitation.id}</b></h4>
				`,
			});
		});
		return this.createToken(user);
	}

	public async confirmUser(code: string) {
		const user = await User.createQueryBuilder()
			.leftJoinAndSelect('User.InvitationUserSet', 'InvitationUser', 'InvitationUser.id = :id', {id : code})
			.getOne();
		InvitationUser.createQueryBuilder().update().set({status: InvitationStatus.CONFIRM}).where({User: user}).execute();
		user.status = UserStatus.CONFIRM;
		user.save();
		if (user.errors) {
			return user.errors;
		} else {
			return this.createToken(user);
		}
	}

	public async getUser(user: User) {
		return new UserDTO(user);
	}

	public async resentPassword(user: User) {
		const pass = uuid().substring(0, 8);
		await user.set_password(pass);
		user.change_password = true;
		user.save();
		if (user.errors) {
			return user.errors;
		} else {
			const transporter = nodemailer.createTransport(environment.MAILER_TRANSPORT);
			transporter.sendMail({
				from: '"Takion" <admin@takionsoft.com>',
				to: user.username,
				subject: 'Reset Password',
				text: 'Reset Password',
				html: `
					<b>Reset Password</b></br>
					<h4>Temporal password: <b>${pass}</b></h4>
				`,
			});
			return true;
		}
	}

	public async changePassword(user: User, cmd: ChangePasswordCmd) {
		await user.compare_password(cmd.oldPassword);
		if (user.errors) {
			return user.errors;
		} else {
			await user.set_password(cmd.newPassword);
			user.change_password = false;
			user.save();
			if (user.errors) {
				return user.errors;
			} else {
				return user;
			}
		}
	}

	public async createToken(signedUser: User) {
		const expiresIn = environment.JWT_EXPIRATION;
		const secretOrKey = environment.SECRET_KEY;
		const user = new TokenUserPayload(signedUser);
		const userPOJO = JSON.parse(JSON.stringify(user));
		const accessToken = jwt.sign(userPOJO, secretOrKey, { expiresIn });
		return new TokenDto({
			expiresIn,
			accessToken,
		});
	}
}
