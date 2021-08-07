import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';

@ApiUseTags('api/profile')
@ApiBearerAuth()
@Crud({
	model: {
		type: Profile,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/profile')
export class ProfileController implements CrudController<Profile> {
	constructor(public service: ProfileService) {}
}
