import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsEmail, IsString, IsOptional, IsUUID, MinLength } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import * as bcrypt from 'bcrypt';

import { Base, Error } from '@app/base.entity';
import { IUser} from './interface/user.interface';
import { Profile } from '@app/profile/profile.entity';

const { UPDATE, CREATE } = CrudValidationGroups;

export enum UserRole {
	ADMIN = 'admin',
	USER = 'user',
}

export enum UserStatus {
	REMOVED = 'removed',
	PENDING = 'pending',
	CONFIRM = 'confirm',
}

@Entity()
export class User extends Base implements IUser {
	constructor(data: IUser) {
		super();
		if (!!data) {
			this.id = data.id;
			this.username = data.username;
			this.firstname = data.firstname;
			this.change_password = data.change_password;
			this.lastname = data.lastname;
			this.password = data.password;
			this.role = data.role;
			this.status = data.status;
			this.lastLogin = data.lastLogin;
			this.lastChangePassword = data.lastChangePassword;
		}
	}

	@ApiModelProperty({type: 'string', format: 'email'})
	@IsOptional({ groups: [UPDATE] })
	@IsEmail({}, {always: true })
	@Column({
		unique: true,
		nullable: false,
	})
	public username: string;

	@ApiModelProperty({type: 'string', format: 'hash'})
	@IsString({always: true })
	@MinLength(8)
	@Column({
		nullable: false,
	})
	public password: string;

	@ApiModelProperty()
	@Column({
		default: false,
	})
	public change_password: boolean;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public firstname: string;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public lastname: string;

	@ApiModelProperty()
	@IsOptional({ groups: [CREATE, UPDATE] })
	@IsEmail({}, {always: true })
	@Column({
		unique: true,
		nullable: true,
	})
	public numid: string;

	@ApiModelProperty({enum: UserRole})
	@Column()
	public role: UserRole;

	@ApiModelProperty({enum: UserStatus})
	@Column()
	public status: UserStatus;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@IsOptional()
	@Column({
		nullable: true,
	})
	public lastLogin: Date;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@IsOptional()
	@Column({
		nullable: true,
	})
	public lastChangePassword: Date;

	@ApiModelProperty({isArray: true, type: 'string', format: 'date-time'})
	@IsOptional()
	@Column('timestamptz', {
		nullable: true,
		array: true,
	})
	public hLogin: Date[];

	@ApiModelProperty({isArray: true, type: 'InvitationUser'})
	@OneToMany(type => InvitationUser, invitation => invitation.User, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public InvitationUserSet: InvitationUser[];

	@ApiModelProperty({isArray: true, type: 'Profile'})
	@OneToMany(type => Profile, profile => profile.User, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public ProfileSet: Profile[];

	public async set_password(password: string){
		this.password = await bcrypt.hash(password, 10);
		const now = new Date();
		this.lastChangePassword = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
		now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
	}

	public async compare_password(password: string){
		const isValid = await bcrypt.compare(password, this.password);
		if (!isValid) {
			const error = new Error();
			error.target = {};
			error.value = 'Password error';
			error.property = 'password';
			error.children = [];
			error.constraints = {
				username: 'Password not valid',
			};
			this.errors = [error];
		}
	}

	public time_login(){
		const now = new Date();
		this.lastLogin = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),
		now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds()));
		try {
			this.hLogin.push(this.lastLogin);
		} catch (error) {
			this.hLogin = [this.lastLogin];
		}
	}
}

export enum InvitationStatus {
	REMOVED = 'removed',
	PENDING = 'pending',
	CONFIRM = 'confirm',
}

export enum InvitationType {
	BOSS = 'boss',
	EMPLOYEE = 'employee',
}

@Entity()
export class InvitationUser extends Base {
	constructor(user: User) {
		super();
		this.User = user;
		this.status = InvitationStatus.PENDING;
		this.type = InvitationType.BOSS;
	}

	@ApiModelProperty()
	@IsEmail({}, {always: true })
	@Column({
		nullable: false,
	})
	public email: string;

	@ApiModelProperty()
	@ManyToOne(type => User, user => user.InvitationUserSet, {
		eager: true,
	})
	public User: User;

	@ApiModelProperty({enum: InvitationStatus})
	@Column()
	public status: InvitationStatus;

	@ApiModelProperty({enum: InvitationType})
	@Column()
	public type: InvitationType;

	@ApiModelProperty()
	@IsOptional({ groups: [CREATE, UPDATE] })
	@IsUUID('4', {always: true })
	@Column({
		nullable: true,
	})
	public company_id: string;
}
