import { Event } from "../model/event";
import { EventData } from "../model/eventData";

export interface EventsRepository {
    getEvents(buildingId:string,query,currentPage): Promise<EventData>;
}