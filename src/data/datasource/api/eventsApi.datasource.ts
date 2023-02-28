import axios from "axios";
import { Event } from "../../../domain/model/event";
import EventsDataSource from "../events.datasource";


const BASE_URL = "https://mobile-backend-jz8h.vercel.app";
import  store  from "../../../configureStore";
import axiosAuth from "../../../domain/usecases/authenticate/service/auth.service.api"

import { EventData } from "../../../domain/model/eventData";
import { json } from "react-router-dom";
  


export default class EventAPIDataSourceImpl implements EventsDataSource {
    async getEvents(buildingId,query,currentPage,conditionFilter,functionalAreaFilter): Promise<EventData> {

	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;

	const config = { headers: { Authorization: `Bearer ${auth.token}` } };

	
	
	  
        let response:string =await axios.get(`${BASE_URL}/fetchEvents/${buildingId}?q=${query}&page=${currentPage}&condition=${conditionFilter}&functionalArea=${functionalAreaFilter}`,config);
		let res =JSON.stringify(response);
		var jsonData = JSON.parse(res);
		
		const data: EventData = {
			events:jsonData.data.events,
		   totalPages:jsonData.data.totalPages,
		   currentPage:jsonData.data.currentPage,
		   conditionFilter:jsonData.data.conditionFilter,
			functionalAreaFilter:jsonData.data.functionalAreaFilter
		   }
		 
		 
		
		return data;

		
    }
}
