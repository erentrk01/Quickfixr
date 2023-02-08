import axios from "axios"
const postEvent = async(url,values) => {
	//buildingId, email,eventTitle, eventDate, eventDescription,functionalArea,condition,serviceContactPhone
	const eventResponse = await axios.post(`${url}/createEvent`, {
        buildingId: values.buildingId,
        email: values.email,
        eventTitle: values.eventTitle,
		eventDate: values.eventDate,
		eventDescription: values.eventDescription,
		functionalArea: values.functionalArea,
		condition: values.condition,
		serviceContactPhone: values.serviceContactPhone
      });

	return eventResponse;
}


 const deleteEvent = async(url,values) => {
	const deleteResponse = await axios.post(`${url}/deleteEvent/${values.eventId}`);
	return deleteResponse;
}