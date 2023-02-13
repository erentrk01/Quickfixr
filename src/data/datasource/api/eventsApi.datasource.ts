import axios from "axios";
import { Event } from "../../../domain/model/event";
import EventsDataSource from "../events.datasource";


const BASE_URL = "http://localhost:3000";
import  store  from "../../../configureStore";
import axiosAuth from "../../../domain/usecases/authenticate/service/auth.service.api"



export default class EventAPIDataSourceImpl implements EventsDataSource {
    async getEvents(buildingId): Promise<Event[]> {

	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;

	const config = { headers: { Authorization: `Bearer ${auth.token}` } };

	  
	
	  
        let response:string = await axiosAuth.get(`${BASE_URL}/fetchEvents/${buildingId}`, config);
		let res =JSON.stringify(response);
		var jsonData = JSON.parse(res);
		
	
	
		let events:Event[] = [];
			console.log("events length: " + JSON.stringify( jsonData.data.events.length))
			console.log("bu: " + JSON.stringify( jsonData.data.events))

		if(jsonData.data.events.length ==0 ) return [];



		for(var i=jsonData.data.events.length-1; i>=0; i--)
		{
			console.log("item-"+i+JSON.stringify(jsonData.data.events[i]))
			let item = jsonData.data.events[i][0]
			console.log("in loop:"+ JSON.stringify(item))

			let event: Event = {
				_id: item._id,
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
