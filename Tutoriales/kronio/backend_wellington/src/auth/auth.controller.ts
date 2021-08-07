import { ApiBearerAuth, ApiImplicitBody, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Body, Controller, HttpStatus, Patch, Post, Req, Res, Get } from '@nestjs/common';
import { Response } from 'express';

import { AuthLoginCmd } from './cmd/auth-login.command';
import { AuthService } from './auth.service';
import { AuthSignUpCmd, AuthConfirmUserCmd } from './cmd/auth-sign-up.cmd';
import { ChangePasswordCmd } from '@app/user/cmd/change-password.cmd';
import { TokenDto } from './dto/token.dto';
import { UserDTO } from './dto/user.dto';
import { User } from '@app/user/user.entity';
import { Error } from '@app/base.entity';

@ApiUseTags('api/auth')
@ApiBearerAuth()
@Controller('api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signup')
	@ApiOperation({ title: 'Sign-up', description: 'Register user. Returns a valid JWT.' })
	@ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: TokenDto })
	@ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
	public async signUp(@Body() user: AuthSignUpCmd, @Res() res: Response) {
		const result: TokenDto | Error[] = await this.authService.signUp(new User(user));
		if (result instanceof TokenDto) {
			res.status(HttpStatus.OK).json(result).send();
		} else {
			res.status(HttpStatus.BAD_REQUEST).json(result).send();
		}
	}

	@Post('confirm_user')
	@ApiOperation({ title: 'Confirm User', description: 'Confirm register user.' })
	@ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: TokenDto })
	@ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
	public async confirmUser(@Body() data: AuthConfirmUserCmd) {
		data = new AuthConfirmUserCmd(data);
		if (data.validate()) {
			return data.errors;
		} else {
			return await this.authService.confirmUser(data.code);
		}
	}

	@Post('login')
	@ApiImplicitBody({ name: 'AuthLoginCmd', type: AuthLoginCmd })
	@ApiOperation({ title: 'Login', description: 'Login user. Generate a new valid JWT.' })
	@ApiResponse({ description: 'JWT successfully created.', status: HttpStatus.CREATED, type: TokenDto })
	@ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
	public async login(@Req() req): Promise<TokenDto> {
		return await this.authService.createToken(new User(req.user));
	}

	@Get('user')
	@ApiOperation({ title: 'Auth User', description: 'Return authenticated user' })
	@ApiResponse({ description: 'Authnticated user.', status: HttpStatus.CREATED, type: UserDTO })
	@ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
	public async getUser(@Req() req) {
		return await this.authService.getUser(new User(req.user));
	}

	@Get('reset_password')
	@ApiOperation({ title: 'Reset password', description: 'Reset user password with hash password.' })
	@ApiResponse({ description: 'Password successfully reset.', status: HttpStatus.CREATED, type: Boolean })
	@ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
	public async resetPassword(@Req() req) {
		return await this.authService.resentPassword(new User(req.user));
	}

	@Patch('change_password')
	@ApiResponse({ status: HttpStatus.OK, description: 'Success', type: User })
	@ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request.' })
	@ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
	@ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
	@ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'An error occured during password hashing.' })
	@ApiOperation({ title: 'Update user password', description: 'Update user password matching route id.' })
	async changePassword(@Req() req, @Body() cmd: ChangePasswordCmd) {
		return await this.authService.changePassword(new User(req.user), cmd);
	}
}
