import axios from "axios"
import { store } from "../../../../store";

export const postEvent = async(url,values) => {
	//buildingId, email,eventTitle, eventDate, eventDescription,functionalArea,condition,serviceContactPhone
	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;

	//console.log("auth token:" +auth.token);

	const config = { headers: { Authorization: `Bearer ${auth.token}` } };

	
		const eventResponse = await axios.post(`${url}/createEvent`, {
        buildingId: auth.buildingId,
		email: auth.email,
        eventTitle: values.title,
		eventDate: values.eventDate,
		eventDescription: values.description,
		functionalArea: values.functionalArea,
		condition: values.condition,
		serviceContactPhone: values.serviceContactPhone
      },config);

	return eventResponse;
}


 export const deleteEvent = async(url,values) => {
	const deleteResponse = await axios.post(`${url}/deleteEvent/${values.eventId}`);
	return deleteResponse;
}


