import { Event } from "../../domain/model/event";
import { EventData } from "../../domain/model/eventData";

export default interface EventDataSource {
    getEvents(buildingId:string,query,currentPage,conditionFilter,functionalAreaFilter): Promise<EventData>;
}