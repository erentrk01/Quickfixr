import { Event } from "../../model/event";
import { EventsRepository } from "../../repository/events.repository";


export interface GetEventsUseCase {

    invoke: (buildingId:string) => Promise<Event[]>

}

export  class GetEvents implements GetEventsUseCase {
	private eventsRepo:EventsRepository;
	constructor(_eventsRepo:EventsRepository) {
		this.eventsRepo = _eventsRepo;
		
	}
	
	async invoke(buildingId:string){
		return this.eventsRepo.getEvents(buildingId);
	}
}
