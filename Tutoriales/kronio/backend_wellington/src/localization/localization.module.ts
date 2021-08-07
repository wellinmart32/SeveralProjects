import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from '@app/auth/middlewares/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country, State, City } from './localization.entity';
import { CountryService, StateService, CityService } from './localization.service';
import { CountryController, StateController, CityController } from './localization.controller';

@Module({
	imports: [TypeOrmModule.forFeature([Country, State, City])],
	providers: [CountryService, StateService, CityService],
	controllers: [CountryController, StateController, CityController],
	exports: [CountryService, StateService, CityService],
})
export class LocalizationModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes(
			'/api/country', '/api/country/:id',
			'/api/state', '/api/state/:id',
			'/api/city', '/api/city/:id',
		);
	}
}
