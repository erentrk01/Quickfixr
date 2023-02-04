import { CardBody,Box,Button,Collapse,Text} from "@chakra-ui/react";
import { useState } from "react";

const EventBody  =({event})=>{
	const [show, setShow] = useState(false)
	const handleToggle = () => setShow(!show)
	return(
		<CardBody>					
			<Box bg="gray.400" borderRadius={12} padding={2}>
				<Text>{event.functionalArea}</Text>
			</Box>
			<Box mt={1} bg='green.600' borderRadius={12} padding={2}>
				<Collapse startingHeight={20} in={show}>
					{event.description}
				</Collapse>
				<Button size='sm' onClick={handleToggle} mt='1rem'>
					Show {show ? 'Less' : 'More'}
				</Button>
			</Box>
			<Box mt={1} bg='green.500' borderRadius={12} padding={2}>
				<Text>{event.serviceContactPhone}</Text>
			</Box>
			<Text>{event.date}</Text>
	</CardBody>
	)
}

export default EventBody;