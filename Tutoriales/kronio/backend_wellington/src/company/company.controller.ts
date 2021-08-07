import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Company, Branch, GroupEmployee } from './company.entity';
import { CompanyService, BranchService, GroupEmployeeService } from './company.service';

@ApiUseTags('api/company')
@ApiBearerAuth()
@Crud({
	model: {
		type: Company,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/company')
export class CompanyController implements CrudController<Company> {
	constructor(public service: CompanyService) {}
}

@ApiUseTags('api/branch')
@ApiBearerAuth()
@Crud({
	model: {
		type: Branch,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/branch')
export class BranchController implements CrudController<Branch> {
	constructor(public service: BranchService) {}
}

@ApiUseTags('api/groupemployee')
@ApiBearerAuth()
@Crud({
	model: {
		type: GroupEmployee,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/groupemployee')
export class GroupEmployeeController implements CrudController<GroupEmployee> {
	constructor(public service: GroupEmployeeService) {}
}
