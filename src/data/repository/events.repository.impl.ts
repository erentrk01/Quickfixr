import { Event } from "../../domain/model/event";
import { EventsRepository } from "../../domain/repository/events.repository";
import EventDataSource from "../datasource/events.datasource";

export class EventsRepositoryImpl implements EventsRepository{
	dataSource: EventDataSource;
	constructor(_dataSource: EventDataSource) {
		this.dataSource = _dataSource;
	}


	async getEvents(): Promise<Event[]> {
		return this.dataSource.getEvents();
	}

}