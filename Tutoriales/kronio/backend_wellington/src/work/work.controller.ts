import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ManageWork, Work, TimeWork, PauseWork } from './work.entity';
import { ManageWorkService, WorkService, TimeWorkService, PauseWorkService } from './work.service';

@ApiUseTags('api/managework')
@ApiBearerAuth()
@Crud({
	model: {
		type: ManageWork,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/managework')
export class ManageWorkController implements CrudController<ManageWork> {
	constructor(public service: ManageWorkService) {}
}

@ApiUseTags('api/work')
@ApiBearerAuth()
@Crud({
	model: {
		type: Work,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/work')
export class WorkController implements CrudController<Work> {
	constructor(public service: WorkService) {}
}

@ApiUseTags('api/timework')
@ApiBearerAuth()
@Crud({
	model: {
		type: TimeWork,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/timework')
export class TimeWorkController implements CrudController<TimeWork> {
	constructor(public service: TimeWorkService) {}
}

@ApiUseTags('api/pausework')
@ApiBearerAuth()
@Crud({
	model: {
		type: PauseWork,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/pausework')
export class PauseWorkController implements CrudController<PauseWork> {
	constructor(public service: PauseWorkService) {}
}
