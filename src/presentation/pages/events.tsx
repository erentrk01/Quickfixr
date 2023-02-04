import { Hide } from "@chakra-ui/react";
import { EventList } from "../organism/event/eventList/eventList.view";
import SideBar from "../organism/sideBar/sideBar.view";

const Events = () => {
	return (
		<>
			<Hide below="md">
				<SideBar/>
			</Hide>
			<EventList/>
		
		</>
	)
}

export default Events;