export interface User {
	_id: number;
    email: string;
	password: string;
	name: string;
	isVerified: boolean;
	isManager: boolean;

}