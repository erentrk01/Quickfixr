import { Event } from "../../domain/model/event";

export default interface EventDataSource {
    getEvents(): Promise<Event[]>;
}