import { Event } from "../../model/event";
import { EventData } from "../../model/eventData";
import { EventsRepository } from "../../repository/events.repository";


export interface GetEventsUseCase {

    invoke: (buildingId:string,query,currentPage,conditionFilter,functionalAreaFilter) => Promise<EventData>

}

export  class GetEvents implements GetEventsUseCase {
	private eventsRepo:EventsRepository;
	constructor(_eventsRepo:EventsRepository) {
		this.eventsRepo = _eventsRepo;
		
	}
	
	async invoke(buildingId:string,query,currentPage,conditionFilter,functionalAreaFilter){
		return this.eventsRepo.getEvents(buildingId,query,currentPage,conditionFilter,functionalAreaFilter);
	}
}
