import { CardBody,Box,Button,Collapse,Text, Tooltip} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useClipboard } from '@chakra-ui/react'
import moment from "moment";


const EventBody  =({event})=>{
	const [show, setShow] = useState(false)
	const handleToggle = () => setShow(!show)
	const { onCopy, hasCopied } = useClipboard(event.serviceContactPhone);

	
	return(
		<CardBody>
			<Box bg="gray.400" borderRadius={12} padding={2}>
				<Tooltip label='Functional Area' fontSize='md'>
					<Text>{event.functionalArea}</Text>
				</Tooltip>

			</Box>
			<Box mt={1} bg='green.600' borderRadius={12} padding={2}>
				<Collapse startingHeight={20} in={show}>

				{event.eventDescription}


				</Collapse>
				<Button size='sm' onClick={handleToggle} mt='1rem'>
					Show {show ? 'Less' : 'More'}
				</Button>
			</Box>
			<Box mt={1} bg='green.500' borderRadius={12} padding={2}>
			<Button size="sm" onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
				<Tooltip label='Phone number' fontSize='md'>
					<Text>{event.serviceContactPhone}</Text>
					
				</Tooltip>

			</Box>
			<Text>{moment(event.date).fromNow()}</Text>
	</CardBody>
	)
}

export default EventBody;