import { Option } from "./option";
export interface Poll{
	_id:any;
	id: string;
	question: string;
	options:Option[];
	createdBy: string;
	voteCount: number;
	percentage: number;
	remainingTime:string;
	isExpired:boolean;
	ownerName:string;

}
