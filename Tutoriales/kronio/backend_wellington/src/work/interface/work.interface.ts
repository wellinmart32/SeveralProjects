import { TypeWorker, TypeRepeat, Day } from '../work.entity';

export interface IManageWork {
	readonly id?: string;
	readonly name?: string;
	readonly typeWorker?: TypeWorker;
	readonly typeRepeat?: TypeRepeat;
	readonly day?: Day;
	readonly days?: Day[];
	readonly time_begin?: Date;
	readonly time_end?: Date;
	readonly description?: string;
}

export interface IWork {
	readonly id?: string;
	readonly time_begin?: Date;
	readonly time_end?: Date;
}

export interface ITimeWork {
	readonly id?: string;
	readonly time_begin?: Date;
	readonly time_end?: Date;
	readonly is_extra?: boolean;
}

export interface IPauseWork {
	readonly id?: string;
	readonly time_begin?: Date;
	readonly time_end?: Date;
	readonly is_permitted?: boolean;
}