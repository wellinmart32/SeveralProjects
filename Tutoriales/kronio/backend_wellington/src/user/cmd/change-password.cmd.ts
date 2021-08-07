import { ApiModelProperty } from '@nestjs/swagger';

export interface IChangePasswordCmd {
	username: string;
	oldPassword: string;
	newPassword: string;
}

export class ChangePasswordCmd {
	constructor(data: IChangePasswordCmd) {
		this.oldPassword = data.oldPassword;
		this.newPassword = data.newPassword;
	}
	@ApiModelProperty() oldPassword: string;
	@ApiModelProperty() newPassword: string;
}
