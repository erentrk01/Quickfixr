import { Event } from "../../model/event";
import { EventsRepository } from "../../repository/events.repository";


export interface GetEventsUseCase {

    invoke: () => Promise<Event[]>

}

export  class GetEvents implements GetEventsUseCase {
	private eventsRepo:EventsRepository;
	constructor(_eventsRepo:EventsRepository) {
		this.eventsRepo = _eventsRepo;
		
	}
	
	async invoke(){
		return this.eventsRepo.getEvents();
	}
}
