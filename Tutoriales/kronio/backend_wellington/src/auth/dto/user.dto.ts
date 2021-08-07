import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '@app/user/user.entity';

export class UserDTO {
	constructor(data: User) {
		this.id = data.id;
		this.username = data.username;
		this.firstname = data.firstname;
		this.change_password = data.change_password;
		this.lastname = data.lastname;
		this.role = data.role;
		this.status = data.status;
		this.lastLogin = data.lastLogin;
	}

	@ApiModelProperty() id: string;
	@ApiModelProperty() username: string;
	@ApiModelProperty() lastname: string;
	@ApiModelProperty() firstname: string;
	@ApiModelProperty() change_password: boolean;
	@ApiModelProperty() role: string;
	@ApiModelProperty() status: string;
	@ApiModelProperty() lastLogin: Date;
}
