import { Hide } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { EventList } from "../organism/event/eventList/eventList.view";
import { Navigate } from "react-router-dom";
import SideBar from "../organism/sideBar/sideBar.view";


const Events = () => {
	const auth:any = useAppSelector(state => state.auth)
	if(!auth._id) return <Navigate to="/login" /> ;

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