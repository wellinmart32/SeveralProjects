import { ApiModelProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsString } from 'class-validator';

import { Base } from '@app/base.entity';
import { ICountry, IState, ICity } from './interface/localization.interface';
import { Profile } from '@app/profile/profile.entity';
import { Company } from '@app/company/company.entity';

@Entity()
export class Country extends Base implements ICountry {
	constructor(data: ICountry) {
		super();
		if (!!data) {
			this.id = data.id;
			this.name = data.name;
			this.code = data.code;
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
		nullable: false,
	})
	public code: string;

	@ApiModelProperty()
	@OneToMany(type => State, state => state.Country, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public StateSet: State[];
}

@Entity()
export class State extends Base implements IState {
	constructor(data: IState) {
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
	@ManyToOne(type => Country, country => country.StateSet, {
		eager: true,
	})
	public Country: Country;

	@ApiModelProperty()
	@OneToMany(type => City, city => city.State, {
		cascade: true,
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public CitySet: City[];
}

@Entity()
export class City extends Base implements ICity {
	constructor(data: ICity) {
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
	@ManyToOne(type => State, state => state.CitySet, {
		eager: true,
	})
	public State: State;

	@ApiModelProperty()
	@OneToMany(type => Profile, profile => profile.City, {
		cascade: true,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	public ProfileSet: Profile[];

	@ApiModelProperty()
	@OneToMany(type => Company, company => company.City, {
		cascade: true,
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE',
	})
	public CompanySet: Company[];
}
