import { UserRole, UserStatus, User } from '@app/user/user.entity';

import { ApiModelProperty } from '@nestjs/swagger';

export class TokenUserPayload {
	constructor(data: User) {
		this.sub = data.id;
		this.username = data.username;
		this.firstname = data.firstname;
		this.lastname = data.lastname;
		this.role = data.role;
		this.status = data.status;
	}
	@ApiModelProperty() sub: string;
	@ApiModelProperty() username: string;
	@ApiModelProperty() firstname: string;
	@ApiModelProperty() lastname: string;
	@ApiModelProperty() role: UserRole;
	@ApiModelProperty() status: UserStatus;
}
