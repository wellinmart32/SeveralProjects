import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from '@app/auth/middlewares/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Profile])],
	providers: [ProfileService],
	controllers: [ProfileController],
	exports: [ProfileService],
})
export class ProfileModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes('/api/profile', '/api/profile/:id');
	}
}
