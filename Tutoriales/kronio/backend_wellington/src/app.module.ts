import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { LocalizationModule } from './localization/localization.module';
import { CompanyModule } from './company/company.module';
import { WorkModule } from './work/work.module';
import { environment } from '@env/environment.dev';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			...environment.ormconfig,
		entities: [__dirname + '/**/*.entity{.ts,.js}'],
		}),
		AuthModule,
		UserModule,
		ProfileModule,
		LocalizationModule,
		CompanyModule,
		WorkModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
