import { MiddlewareConsumer, Module, NestModule, } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { JwtStrategy } from './passport/jwt.strategy';
import { LocalStrategy } from './passport/local.strategy';
import { LogInMiddleware } from './middlewares/login.middleware';
import { UserModule } from '@app/user/user.module';

@Module({
	providers: [AuthService, JwtStrategy, LocalStrategy],
	controllers: [AuthController],
	imports: [UserModule],
})
export class AuthModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(LogInMiddleware).forRoutes('/api/auth/login');
		consumer.apply(JwtMiddleware).forRoutes('/api/auth/user', '/api/auth/reset_password', '/api/auth/change_password');
	}
}
