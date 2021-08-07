import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { ManageWork, Work, TimeWork, PauseWork } from './work.entity';

@Injectable()
export class ManageWorkService extends TypeOrmCrudService<ManageWork> {
	constructor(@InjectRepository(ManageWork) repo) {
		super(repo);
	}
}

@Injectable()
export class WorkService extends TypeOrmCrudService<Work> {
	constructor(@InjectRepository(Work) repo) {
		super(repo);
	}
}

@Injectable()
export class TimeWorkService extends TypeOrmCrudService<TimeWork> {
	constructor(@InjectRepository(TimeWork) repo) {
		super(repo);
	}
}

@Injectable()
export class PauseWorkService extends TypeOrmCrudService<PauseWork> {
	constructor(@InjectRepository(PauseWork) repo) {
		super(repo);
	}
}
