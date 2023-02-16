export interface Event {
	_id: any;
	title: string;
    description: string;
	functionalArea:string;
	condition:string;
	serviceContactPhone:string;
	date:string;
	likes: {
		_id: string;
		userId: string;
	  }[];
	  comments: {
		_id: string;
		userId: string;
		comment: string;
		createdAt: string;
	  }[];
}