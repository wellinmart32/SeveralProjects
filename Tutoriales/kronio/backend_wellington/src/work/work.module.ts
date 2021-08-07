import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from '@app/auth/middlewares/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManageWork, Work, TimeWork, PauseWork } from './work.entity';
import { ManageWorkService, WorkService, TimeWorkService, PauseWorkService } from './work.service';
import { ManageWorkController, WorkController, TimeWorkController, PauseWorkController } from './work.controller';

@Module({
	imports: [TypeOrmModule.forFeature([ManageWork, Work, TimeWork, PauseWork])],
	providers: [ManageWorkService, WorkService, TimeWorkService, PauseWorkService],
	controllers: [ManageWorkController, WorkController, TimeWorkController, PauseWorkController],
	exports: [ManageWorkService, WorkService, TimeWorkService, PauseWorkService],
})
export class WorkModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes(
			'/api/managework', '/api/managework/:id',
			'/api/work', '/api/work/:id',
			'/api/timework', '/api/timework/:id',
			'/api/pausework', '/api/pausework/:id',
		);
	}
}
