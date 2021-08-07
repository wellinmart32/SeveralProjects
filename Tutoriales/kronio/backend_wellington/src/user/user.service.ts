import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { User } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
	constructor(@InjectRepository(User) repo) {
		super(repo);
	}

	public async findByUsername(find_username: string): Promise<User> {
		return await this.repo.findOne({
			where: { username : find_username },
		});
	}
}
