import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { JwtMiddleware } from '@app/auth/middlewares/jwt.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company, Branch, GroupEmployee } from './company.entity';
import { CompanyService, BranchService, GroupEmployeeService } from './company.service';
import { CompanyController, BranchController, GroupEmployeeController } from './company.controller';

@Module({
	providers: [CompanyService, BranchService, GroupEmployeeService],
	controllers: [CompanyController, BranchController, GroupEmployeeController],
	imports: [TypeOrmModule.forFeature([Company, Branch, GroupEmployee])],
	exports: [CompanyService, BranchService, GroupEmployeeService],
})
export class CompanyModule implements NestModule {
	public configure(consumer: MiddlewareConsumer) {
		consumer.apply(JwtMiddleware).forRoutes(
			'/api/company', '/api/company/:id',
			'/api/branch', '/api/branch/:id',
			'/api/groupemployee', '/api/groupemployee/:id',
		);
	}
}
