import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Country, State, City } from './localization.entity';
import { CountryService, StateService, CityService } from './localization.service';

@ApiUseTags('api/country')
@ApiBearerAuth()
@Crud({
	model: {
		type: Country,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/country')
export class CountryController implements CrudController<Country> {
	constructor(public service: CountryService) {}
}

@ApiUseTags('api/state')
@ApiBearerAuth()
@Crud({
	model: {
		type: State,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/state')
export class StateController implements CrudController<State> {
	constructor(public service: StateService) {}
}

@ApiUseTags('api/city')
@ApiBearerAuth()
@Crud({
	model: {
		type: City,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/city')
export class CityController implements CrudController<City> {
	constructor(public service: CityService) {}
}
