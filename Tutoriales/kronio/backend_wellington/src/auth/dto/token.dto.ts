import { ApiModelProperty } from '@nestjs/swagger';

export class TokenDto {
	constructor(data: { expiresIn?: number; accessToken?: string}) {
		this.expiresIn = data.expiresIn;
		this.accessToken = data.accessToken;
	}

	@ApiModelProperty() expiresIn: number;
	@ApiModelProperty() accessToken: string;
}
