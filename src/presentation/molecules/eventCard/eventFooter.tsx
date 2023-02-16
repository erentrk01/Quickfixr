import { useRef, useState } from "react";

import {
	CardFooter, 
	HStack, 
	Button,
	useDisclosure,
	AlertDialogFooter,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialog,
	VStack
 } from "@chakra-ui/react";

import { IconContext } from "react-icons";
import {AiTwotoneDelete} from "react-icons/ai";
import {SlLike} from "react-icons/sl";
import {FcShare} from "react-icons/fc"
import {MdTipsAndUpdates} from "react-icons/md"
import warning from '../../../assets/warning.png';

import { deleteEventFromDb,likeEvent } from "../../../domain/usecases/event/eventSlice";
import { useAppDispatch, useAppSelector } from "../../../configureStore";





const EventFooter = ({eventId}) => {
	const dispatch = useAppDispatch()
	const cancelRef = useRef<any>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [isLiked, setIsLiked] = useState(false);



	const handleDelete = (id) => {
		console.log("delete eventId: " + id)
		dispatch(deleteEventFromDb(id))
		
		onClose();
	}

	const handleLike = (id) => {
		setIsLiked(!isLiked)
		console.log("like eventId: " + id)
		dispatch(likeEvent(id));

	}


	


	return (<>
					<AlertDialog
        			isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
					isCentered
				 >
       				 <AlertDialogOverlay>
							<AlertDialogContent    color={"red.500"}  bgGradient={[
							'linear(to-tr, teal.300, yellow.400)',
							'linear(to-t, blue.200, teal.500)',
							'linear(to-b, orange.100, purple.300)']}>

								<AlertDialogHeader fontWeight='bold' fontSize='lg'  >
									Delete Event
									</AlertDialogHeader>
								<VStack alignItems={"center"}>
								<img src={warning} alt='warning' width='100px' height='100px' />

								<AlertDialogBody>

									
									Are you sure? You can't undo this action afterwards.
									</AlertDialogBody>
									</VStack>

								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={onClose}>
										Cancel
									</Button>
									<Button 
										colorScheme='red' 
										onClick={()=>handleDelete(eventId)}
										ml={3}>
											Delete
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog> 
		<CardFooter >
			<HStack borderRadius={12} padding={3}>
				<Button  bg="black.100" onClick={onOpen } >
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<AiTwotoneDelete/>
					</IconContext.Provider>
				</Button>
				<Button  bg="black.100" onClick={()=>handleLike(eventId)} >
				<IconContext.Provider
					value={{color:"#14da8f",size:"22px"}}>
					<SlLike/>
				</IconContext.Provider>
				</Button>
				<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
			 		<MdTipsAndUpdates/>
				</IconContext.Provider >
				<IconContext.Provider 						
					value={{color:"#14da8f",size:"22px"}}>
					 <FcShare/>
				</IconContext.Provider>
			</HStack>
	</CardFooter>
	</>
	)
}

export default EventFooter;