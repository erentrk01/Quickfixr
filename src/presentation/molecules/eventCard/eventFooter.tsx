import { Button, CardFooter, HStack, useDisclosure } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import {AiTwotoneDelete} from "react-icons/ai";
import {SlLike} from "react-icons/sl";
import {FcShare} from "react-icons/fc"
import {MdTipsAndUpdates} from "react-icons/md"

const EventFooter = ({onOpen}) => {
	return (
		<CardFooter >
			<HStack borderRadius={12} padding={3}>
				<Button onClick={onOpen} >
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<AiTwotoneDelete/>
					</IconContext.Provider>
				</Button>
				<IconContext.Provider
					value={{color:"#14da8f",size:"22px"}}>
					<SlLike/>
				</IconContext.Provider>
				<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
			 		<MdTipsAndUpdates/>
				</IconContext.Provider >
				<IconContext.Provider 						
					value={{color:"#14da8f",size:"22px"}}>
					 <FcShare/>
				</IconContext.Provider>
			</HStack>
	</CardFooter>
	)
}

export default EventFooter;