import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from '@app/auth/middlewares/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	imports: [TypeOrmModule.forFeature([User])],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes('/api/user', '/api/user/:id');
	}
}
