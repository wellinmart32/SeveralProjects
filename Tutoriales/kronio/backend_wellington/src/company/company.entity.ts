import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';

import { Base } from '@app/base.entity';
import { ICompany, IBranch, IGroupEmployee } from './interface/company.interface';
import { Profile } from '@app/profile/profile.entity';
import { City } from '@app/localization/localization.entity';

@Entity()
export class Company extends Base implements ICompany {
	constructor(data: ICompany) {
		super();
		if (!!data) {
			this.id = data.id;
			this.name = data.name;
			this.web = data.web;
			this.address = data.address;
			this.email = data.email;
		}
	}

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public name: string;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: true,
	})
	public web: string;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: true,
	})
	public address: string;

	@ApiModelProperty()
	@IsEmail({}, {always: true })
	@Column({
		nullable: true,
	})
	public email: string;

	@ApiModelProperty()
	@ManyToOne(type => City, city => city.CompanySet, {
		eager: true,
	})
	public City: City;

	@ApiModelProperty()
	@ManyToOne(type => Profile, manager => manager.CompanySet, {
		eager: true,
	})
	public Manager: Profile;

	@ManyToMany(type => Profile, {
		eager: true,
	})
	@JoinTable()
	public Admins: Profile[];

	@ApiModelProperty()
	@OneToMany(type => Branch, branch => branch.Company, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public BranchSet: Branch[];
}

@Entity()
export class Branch extends Base implements IBranch {
	constructor(data: IBranch) {
		super();
		if (!!data) {
			this.id = data.id;
			this.name = data.name;
			this.address = data.address;
			this.email = data.email;
		}
	}

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public name: string;

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: true,
	})
	public address: string;

	@ApiModelProperty()
	@IsEmail({}, {always: true })
	@Column({
		nullable: true,
	})
	public email: string;

	@ApiModelProperty()
	@ManyToOne(type => Company, company => company.BranchSet, {
		eager: true,
	})
	public Company: Company;

	@ApiModelProperty()
	@ManyToOne(type => City, city => city.CompanySet, {
		eager: true,
	})
	public City: City;

	@ApiModelProperty()
	@ManyToOne(type => Profile, manager => manager.BranchSet, {
		eager: true,
	})
	public Manager: Profile;

	@ApiModelProperty()
	@OneToMany(type => GroupEmployee, group => group.Branch, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public GroupEmployeeSet: GroupEmployee[];
}

@Entity()
export class GroupEmployee extends Base implements IGroupEmployee {
	constructor(data: IGroupEmployee) {
		super();
		if (!!data) {
			this.id = data.id;
			this.name = data.name;
		}
	}

	@ApiModelProperty()
	@IsString({always: true })
	@Column({
		nullable: false,
	})
	public name: string;

	@ApiModelProperty()
	@ManyToOne(type => Branch, branch => branch.GroupEmployeeSet, {
		eager: true,
	})
	public Branch: Branch;

	@ApiModelProperty()
	@ManyToOne(type => Profile, manager => manager.GroupEmployeeSet, {
		eager: true,
	})
	public Manager: Profile;

	@ManyToMany(type => Profile, {
		eager: true,
	})
	@JoinTable()
	public Employees: Profile[];

	@ManyToOne(type => GroupEmployee, group => group.ChildGroupEmployeeSet, {
		eager: true,
	})
	public ParentGroupEmployee: GroupEmployee;

	@OneToMany(type => GroupEmployee, group => group.ParentGroupEmployee, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public ChildGroupEmployeeSet: GroupEmployee[];
}
