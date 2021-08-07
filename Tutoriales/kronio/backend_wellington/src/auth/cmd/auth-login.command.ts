import { ApiModelProperty } from '@nestjs/swagger';

export class AuthLoginCmd {
	@ApiModelProperty() username: string;
	@ApiModelProperty() password: string;
}
