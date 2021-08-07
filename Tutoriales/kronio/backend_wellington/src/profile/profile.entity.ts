import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsPhoneNumber, IsString } from 'class-validator';

import { Base } from '@app/base.entity';
import { IProfile} from './interface/profile.interface';
import { User } from '@app/user/user.entity';
import { City } from '@app/localization/localization.entity';
import { Company, Branch, GroupEmployee } from '@app/company/company.entity';
import { Work } from '@app/work/work.entity';

export enum ProfileRole {
	ADMIN = 'admin',
	BOSS = 'boss',
	EMPLOYEE = 'employee',
}

@Entity()
export class Profile extends Base implements IProfile {
	constructor(data: IProfile) {
		super();
		if (!!data) {
			this.id = data.id;
			this.address = data.address;
			this.data = data.data;
			this.role = data.role;
		}
	}

	@ApiModelProperty({type: 'User'})
	@ManyToOne(type => User, user => user.ProfileSet, {
		eager: true,
	})
	public User: User;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		unique: true,
		nullable: false,
	})
	public address: string;

	@ApiModelProperty({type: 'json'})
	@Column('jsonb')
	public data: object;

	@ApiModelProperty({enum: ProfileRole})
	@Column()
	public role: ProfileRole;

	@ApiModelProperty({type: City})
	@ManyToOne(type => City, city => city.ProfileSet, {
		eager: true,
	})
	public City: City;

	@ApiModelProperty({type: Company, isArray: true})
	@OneToMany(type => Company, company => company.Manager, {
		cascade: true,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	public CompanySet: Company[];

	@ApiModelProperty({type: Branch, isArray: true})
	@OneToMany(type => Branch, branch => branch.Manager, {
		cascade: true,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	public BranchSet: Branch[];

	@ApiModelProperty({type: GroupEmployee, isArray: true})
	@OneToMany(type => GroupEmployee, group => group.Manager, {
		cascade: true,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	public GroupEmployeeSet: GroupEmployee[];

	@ApiModelProperty({type: Work, isArray: true})
	@OneToMany(type => Work, work => work.Profile, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public WorkSet: Work[];
}
