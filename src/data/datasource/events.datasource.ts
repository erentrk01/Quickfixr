import { Event } from "../../domain/model/event";

export default interface EventDataSource {
    getEvents(buildingId:string): Promise<Event[]>;
}