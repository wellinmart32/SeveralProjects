import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Company, Branch, GroupEmployee } from './company.entity';

@Injectable()
export class CompanyService extends TypeOrmCrudService<Company> {
	constructor(@InjectRepository(Company) repo) {
		super(repo);
	}
}

@Injectable()
export class BranchService extends TypeOrmCrudService<Branch> {
	constructor(@InjectRepository(Branch) repo) {
		super(repo);
	}
}

@Injectable()
export class GroupEmployeeService extends TypeOrmCrudService<GroupEmployee> {
	constructor(@InjectRepository(GroupEmployee) repo) {
		super(repo);
	}
}
