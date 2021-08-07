import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Country, State, City } from './localization.entity';

@Injectable()
export class CountryService extends TypeOrmCrudService<Country> {
	constructor(@InjectRepository(Country) repo) {
		super(repo);
	}
}

@Injectable()
export class StateService extends TypeOrmCrudService<State> {
	constructor(@InjectRepository(State) repo) {
		super(repo);
	}
}

@Injectable()
export class CityService extends TypeOrmCrudService<City> {
	constructor(@InjectRepository(City) repo) {
		super(repo);
	}
}
