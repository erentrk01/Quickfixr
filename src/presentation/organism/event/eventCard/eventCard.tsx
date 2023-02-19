import { Box, Card, CardHeader, HStack, Tooltip,Text, Flex, Spacer,useColorMode  } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import EventBody from "../../../molecules/eventCard/eventBody";
import EventFooter from "../../../molecules/eventCard/eventFooter";
import { ReactComponent as Home} from '../../../../assets/building.svg';
import {motion} from 'framer-motion'

const EventCard = ({event,eventIcon}) => {
	const { colorMode } = useColorMode();
	const bgColor = colorMode === 'light' ? 'pink.200' : 'gray.700';
  
	
	return (
		<motion.div
		initial={{ opacity: 0, y: -20}}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.3 }}
	>
<Card bg={bgColor}  mt={4} borderRadius={12}>
<CardHeader >

	<HStack justifyContent={"space-between"}
	>
	
		<Tooltip 
		   
		label={event.condition} 
			borderRadius={10}
			placement='auto-start' fontSize='md'>
			<Box>
				<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
				{eventIcon}
				</IconContext.Provider>
			</Box>
		</Tooltip>
		<Spacer width={"20%"}/>
		
    <Home width="100px" height="100px" />

		
		
		</HStack>
		<Box width="300px" bg='orange.300' borderRadius={12} padding={2}>
			<Text>{event.title}</Text>
		</Box>
</CardHeader>
<EventBody event={event}/>
<Text>Likes:{event.likes.length}</Text>
<EventFooter
 eventId={event._id} 
 />
</Card>
</motion.div>


	)
}


export default EventCard;