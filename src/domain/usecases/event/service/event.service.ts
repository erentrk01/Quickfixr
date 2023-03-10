import axios from "axios"
import  store  from "../../../../configureStore";


export const postEvent = async(url,values) => {
	//buildingId, email,eventTitle, eventDate, eventDescription,functionalArea,condition,serviceContactPhone
	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;

	//console.log("auth token:" +auth.token);
	console.log("auth token for create:" +auth.accessToken)

	const config = { headers: { Authorization: `Bearer ${auth.accessToken}` } };
	console.log("config:" +JSON.stringify(config))

	
		const eventResponse = await axios.post(`https://mobile-backend-jz8h.vercel.app/createEvent`, {			buildingId: auth.buildingId,
		email: auth.email,
		title: values.title,
		eventDate: values.eventDate,
		eventDescription: values.description,
		functionalArea: values.functionalArea,
		condition: values.condition,
		serviceContactPhone: values.serviceContactPhone
		},config);

	return eventResponse;
}


 export const deleteEvent = async(url,values) => {
	
	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;
	const config = { headers: { Authorization: `Bearer ${auth.accessToken}` } };

	const deleteResponse = await axios.delete(`${url}/deleteEvent/${values}/${auth.buildingId}`,config);
	return deleteResponse;
}

export const likeEventService = async(url,values) => {
	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;
	console.log(auth.accessToken);
	const config = { headers: { Authorization: `Bearer ${auth.accessToken}` } };
	const likeResponse = await axios.put(`${url}/events/${values}/like`,{email:auth.email});
	return likeResponse;
}
export const unlikeEventService = async(url,values) => {
	const reduxStore = store.getState();
	const auth:any = reduxStore.auth;
	console.log("unlike serviiceee")
	const config = { headers: { Authorization: `Bearer ${auth.accessToken}` } };
	const unlikeResponse = await axios.put(`${url}/events/${values}/unlike`,{email:auth.email});
	return unlikeResponse;
}

