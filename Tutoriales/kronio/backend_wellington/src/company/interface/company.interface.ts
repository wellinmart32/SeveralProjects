export interface ICompany {
	readonly id?: string;
	readonly name?: string;
	readonly web?: string;
	readonly address?: string;
	readonly email?: string;
}

export interface IBranch {
	readonly id?: string;
	readonly name?: string;
	readonly address?: string;
	readonly email?: string;
}

export interface IGroupEmployee {
	readonly id?: string;
	readonly name?: string;
}
