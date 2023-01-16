import { CardFooter, Text } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import {IoChevronForward} from "react-icons/io5";

const ServiceCardFooter= ()=>{
	return (
		<CardFooter>
			<IconContext.Provider  value={{color:"#14da8f",size:"22px"}}>
				<IoChevronForward/>
			</IconContext.Provider>
			<Text>learn more</Text>
		</CardFooter>
	)
}

export default ServiceCardFooter;