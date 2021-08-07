import { ProfileRole } from '../profile.entity';

export interface IProfile {
	readonly id?: string;
	readonly address?: string;
	readonly data?: object;
	readonly role?: ProfileRole;
}
