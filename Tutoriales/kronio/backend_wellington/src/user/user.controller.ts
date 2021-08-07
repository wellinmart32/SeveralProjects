import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { User } from './user.entity';
import { UserService } from './user.service';

@ApiUseTags('api/user')
@ApiBearerAuth()
@Crud({
	model: {
		type: User,
	},
	params : {
		id : {
			field : 'id' ,
			type : 'uuid',
			primary : true,
	   },
	 },
})
@Controller('api/user')
export class UserController implements CrudController<User> {
	constructor(public service: UserService) {}
}