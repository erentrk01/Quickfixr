import { Event } from './event';
export interface EventData {
	events: Event[];
	currentPage: any;
	totalPages: any;
	conditionFilter:any;
	functionalAreaFilter:any;
  }