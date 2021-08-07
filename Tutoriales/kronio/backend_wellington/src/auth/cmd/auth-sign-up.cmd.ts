import { User } from '@app/user/user.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { BaseDTO} from '@app/base.entity';

export class AuthSignUpCmd {
	constructor(data: User) {
		this.username = data.username;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.password = data.password;
	}
	@ApiModelProperty() username: string;
	@ApiModelProperty() firstname: string;
	@ApiModelProperty() lastname: string;
	@ApiModelProperty() password: string;
}

export class AuthConfirmUserCmd extends BaseDTO {
	constructor(data: AuthConfirmUserCmd) {
		super();
		this.code = data.code;
	}

	@ApiModelProperty()
	@IsUUID('4', {always: true})
	public code: string;

}
