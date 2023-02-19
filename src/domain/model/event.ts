import {User} from './user';
export interface Event {
	userId: User;
	_id: any;
	title: string;
    description: string;
	functionalArea:string;
	condition:string;
	serviceContactPhone:string;
	date:string;
	likes:any[];
	  comments: {
		_id: string;
		userId: string;
		comment: string;
		createdAt: string;
	  }[];
}