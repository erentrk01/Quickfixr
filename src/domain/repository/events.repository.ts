import { Event } from "../model/event";

export interface EventsRepository {
    getEvents(buildingId:string): Promise<Event[]>;
}