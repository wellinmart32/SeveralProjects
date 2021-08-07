import { UserRole, UserStatus } from '../user.entity';

export interface IUser {
	readonly id?: string;
	readonly username?: string;
	readonly password?: string;
	readonly change_password?: boolean;
	readonly firstname?: string;
	readonly lastname?: string;
	readonly role?: UserRole;
	readonly status?: UserStatus;
	readonly lastLogin?: Date;
	readonly lastChangePassword?: Date;
}
