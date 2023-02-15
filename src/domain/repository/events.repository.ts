import { EventData } from "../model/eventData";

export interface EventsRepository {
    getEvents(buildingId:string,query,currentPage,conditionFilter,functionalAreaFilter): Promise<EventData>;
}