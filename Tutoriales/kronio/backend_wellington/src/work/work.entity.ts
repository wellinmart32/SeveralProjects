import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { IsString, IsOptional } from 'class-validator';

import { Base } from '@app/base.entity';
import { IManageWork, IWork, ITimeWork, IPauseWork } from './interface/work.interface';
import { GroupEmployee } from '@app/company/company.entity';
import { Profile } from '@app/profile/profile.entity';

export enum TypeWorker {
	GROUPEMPLOYEE = 'groupemployee',
	EMPLOYEES = 'employees',
}

export enum TypeRepeat {
	NONE = 0,
	DAILY = 1,
	WEEKLY = 2,
	MONTHLY = 3,
	ANNUALLY = 4,
}

export enum Day {
	Monday = 0,
	Tuesday = 1,
	Wednesday = 2,
	Thursday = 3,
	FRIDAY = 4,
	Saturday = 5,
	Sunday = 6,
}

@Entity()
export class ManageWork extends Base implements IManageWork {
	constructor(data: IManageWork) {
		super();
		if (!!data) {
			this.id = data.id;
			this.name = data.name;
			this.type_worker = data.typeWorker;
			this.type_repeat = data.typeRepeat;
			this.day = data.day;
			this.days = data.days;
			this.time_begin = data.time_begin;
			this.time_end = data.time_end;
			this.description = data.description;
		}
	}

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public name: string;

	@ApiModelProperty({enum: TypeWorker})
	@Column()
	public type_worker: TypeWorker;

	@ApiModelProperty({enum: TypeRepeat})
	@Column()
	public type_repeat: TypeRepeat;

	@ApiModelProperty({enum: Day})
	@IsOptional()
	@Column()
	public day: Day;

	@ApiModelProperty({isArray: true, enum: Day})
	@IsOptional()
	@Column({
		type: 'enum',
		enum: Day,
		array: true,
		nullable: true,
	})
	public days: Day[];

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_begin: Date;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_end: Date;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public description: string;

	@ApiModelProperty({type: 'GroupEmployee', isArray: true})
	@ManyToMany(type => GroupEmployee, {
		eager: true,
	})
	@JoinTable()
	public GroupEmployee: GroupEmployee[];

	@ApiModelProperty({type: 'Profile', isArray: true})
	@ManyToMany(type => Profile, {
		eager: true,
	})
	@JoinTable()
	public Profile: Profile[];

	@ApiModelProperty({type: 'Work', isArray: true})
	@OneToMany(type => Work, work => work.ManageWork, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public WorkSet: Work[];
}

@Entity()
export class Work extends Base implements IWork {
	constructor(data: IWork) {
		super();
		if (!!data) {
			this.id = data.id;
			this.time_begin = data.time_begin;
			this.time_end = data.time_end;
		}
	}

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_begin: Date;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_end: Date;

	@ApiModelProperty({type: 'Profile'})
	@ManyToOne(type => Profile, profile => profile.WorkSet, {
		eager: true,
	})
	public Profile: Profile;

	@ApiModelProperty({type: 'ManageWork'})
	@ManyToOne(type => ManageWork, manager => manager.WorkSet, {
		eager: true,
	})
	public ManageWork: ManageWork;

	@ApiModelProperty({type: 'TimeWork', isArray: true})
	@OneToMany(type => TimeWork, timework => timework.Work, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public TimeWorkSet: TimeWork[];

	@ApiModelProperty({type: 'PauseWork', isArray: true})
	@OneToMany(type => PauseWork, pausework => pausework.Work, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public PauseWorkSet: PauseWork[];
}

@Entity()
export class TimeWork extends Base implements ITimeWork {
	constructor(data: ITimeWork) {
		super();
		if (!!data) {
			this.id = data.id;
			this.time_begin = data.time_begin;
			this.time_end = data.time_end;
			this.is_extra = data.is_extra;
		}
	}

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_begin: Date;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_end: Date;

	@ApiModelProperty()
	@Column({
		default: false,
	})
	public is_extra: boolean;

	@ApiModelProperty({type: 'Work'})
	@ManyToOne(type => Work, work => work.TimeWorkSet, {
		eager: true,
	})
	public Work: Work;
}

@Entity()
export class PauseWork extends Base implements IPauseWork {
	constructor(data: IPauseWork) {
		super();
		if (!!data) {
			this.id = data.id;
			this.time_begin = data.time_begin;
			this.time_end = data.time_end;
			this.is_permitted = data.is_permitted;
		}
	}

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_begin: Date;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@Column('time')
	public time_end: Date;

	@ApiModelProperty()
	@Column({
		default: false,
	})
	public is_permitted: boolean;

	@ApiModelProperty({type: 'Work'})
	@ManyToOne(type => Work, work => work.PauseWorkSet, {
		eager: true,
	})
	public Work: Work;
}