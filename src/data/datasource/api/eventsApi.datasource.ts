import axios from "axios";
import { Event } from "../../../domain/model/event";
import EventsDataSource from "../events.datasource";

import { useEffect } from "react";
import { useAppSelector } from "../../../store";

const BASE_URL = "http://localhost:3000";
import { store } from "../../../store";



export default class EventAPIDataSourceImpl implements EventsDataSource {
    async getEvents(buildingId): Promise<Event[]> {

	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;

	const config = { headers: { Authorization: `Bearer ${auth.token}` } };

	  
	
	  
        let response:string = await axios.get(`${BASE_URL}/fetchEvents/${buildingId}`, config);
		let res =JSON.stringify(response);
		var jsonData = JSON.parse(res);
		
	
	
		let events:Event[] = [];
		
		for(let i=jsonData.data.events.length-1; i>=0; i--){
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
			console.log("eventaPI:"+ events)

			//gelen data boş ise

			
			return events;
		}
    }
