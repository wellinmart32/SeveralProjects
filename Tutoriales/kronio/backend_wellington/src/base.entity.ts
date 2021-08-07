import { ApiModelProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, BaseEntity } from 'typeorm';
import { IsUUID, IsOptional, validateSync, ValidationError } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';

export class Error {
	target: object;
	value: string;
	property: string;
	children: Error[];
	constraints: {
		[type: string]: string;
	};
}

function convert_to_interface(obj: ValidationError) {
	const error = new Error();
	error.target = obj.target;
	error.value = obj.value;
	error.property = obj.property;
	error.children = obj.children.map(convert_to_interface);
	error.constraints = obj.constraints;
	return error;
}

const { CREATE } = CrudValidationGroups;

export abstract class Base extends BaseEntity {
	@ApiModelProperty({type: 'string', format: 'uuid'})
	@IsOptional({ groups: [CREATE] })
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@CreateDateColumn({type: 'timestamptz'})
	public created: Date;

	@ApiModelProperty({type: 'string', format: 'date-time'})
	@UpdateDateColumn({type: 'timestamptz'})
	public updated: Date;

	@ApiModelProperty({type: 'number'})
	@VersionColumn()
	public version: number;

	public errors: Error[];

	public async save(): Promise<this> {
		const errors = validateSync(this);
		if (errors.length > 0) {
			this.errors = errors.map(convert_to_interface);
			return this;
		} else {
			return super.save();
		}
	}
}

export abstract class BaseDTO {

	public errors: Error[];

	public validate(): boolean {
		const errors = validateSync(this);
		if (errors.length > 0) {
			this.errors = errors.map(convert_to_interface);
			return true;
		} else {
			return false;
		}
	}
}
