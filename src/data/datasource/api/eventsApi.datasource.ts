import { Event } from "../../../domain/model/event";
import EventsDataSource from "../events.datasource";
import { EventsApiEntity } from "./entity/eventsApi.entity";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface TypedResponse<T = any> extends Response {
    json<P = T>(): Promise<P>;
}

function myFetch<T>(...args: any): Promise<TypedResponse<T>> {
    return fetch.apply(window, args);
}

export default class EventAPIDataSourceImpl implements EventsDataSource {
    async getEvents(): Promise<Event[]> {
        let response = await myFetch<EventsApiEntity[]>(`${BASE_URL}/events`);
        let data = await response.json();
        return data.map((item) => ({
            id: item.id,
            title: item.title,
            isComplete: item.completed,
        }));
    }
}