import { Event } from "../../domain/model/event";
import { EventData } from "../../domain/model/eventData";
import { EventsRepository } from "../../domain/repository/events.repository";
import EventDataSource from "../datasource/events.datasource";

export class EventsRepositoryImpl implements EventsRepository{
	dataSource: EventDataSource;
	constructor(_dataSource: EventDataSource) {
		this.dataSource = _dataSource;
	}


	async getEvents(buildingId,query,currentPage): Promise<EventData> {
		return this.dataSource.getEvents(buildingId,query,currentPage);
	}

}