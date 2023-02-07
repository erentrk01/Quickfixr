import axios from "axios";
import { Event } from "../../../domain/model/event";
import EventsDataSource from "../events.datasource";

import { useEffect } from "react";

const BASE_URL = "http://localhost:3000";



export default class EventAPIDataSourceImpl implements EventsDataSource {
    async getEvents(buildingId): Promise<Event[]> {
        let response:string = await axios.get(`${BASE_URL}/fetchEvents/${buildingId}`);
		let res =JSON.stringify(response);
		var jsonData = JSON.parse(res);
		
	
	
		let events:Event[] = [];
		
		for(let i=0; i<jsonData.data.events.length; i++){
			let item = jsonData.data.events[i][0];

			let event: Event = {
				title: item.eventTitle,
				description: item.eventDescription,
				date: item.date,
				functionalArea: item.functionalArea,
				condition: item.condition,
				serviceContactPhone: item.serviceContactPhone,
			}
			events.push(event);
		}


			//gelen data boş ise

			
			return events;
		}
    }
