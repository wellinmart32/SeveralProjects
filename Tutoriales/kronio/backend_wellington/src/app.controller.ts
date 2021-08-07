import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('root')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	root(): string {
		return this.appService.root();
	}
}
