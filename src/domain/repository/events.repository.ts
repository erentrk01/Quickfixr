import { Event } from "../model/event";

export interface EventsRepository {
    getEvents(): Promise<Event[]>;
}