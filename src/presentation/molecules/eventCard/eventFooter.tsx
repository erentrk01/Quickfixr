import { FC, useRef, useState } from "react";

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


import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { deleteEventFromDb,likeEvent,unlikeEvent } from "../../../domain/usecases/event/eventSlice";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import CommentModal from "../../organism/event/comment/commentModal";

import { WhatsappShareButton } from 'react-share';
interface EventFooterProps {
	eventId: string;
	liked: boolean;

  }
  



const EventFooter: FC<EventFooterProps> = ({eventId,liked}) => {
	const dispatch = useAppDispatch()
	const cancelRef = useRef<any>(null)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { isOpen: isCommentOpen , onOpen: onCommentOpen, onClose: onCommentClose } = useDisclosure()

	const [isLiked, setIsLiked] = useState(false);

	const shareUrl = `http://localhost:5173/Events/${eventId}`;

	const handleDelete = (id) => {
		console.log("delete eventId: " + id)
		dispatch(deleteEventFromDb(id))
		
		onClose();
	}

	const handleLike = (id) => {
		
		console.log("like eventId: " + id)
		console.log(liked)
		if(liked) 
		{	console.log("unlike dispatch triggered!")
			dispatch(unlikeEvent(id));}
		else {console.log("like dispatch triggered!")
			dispatch(likeEvent(id));}
		setIsLiked(!liked); // assuming the API call was successful
	
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
					{isLiked ? "Unlike" : "Like"}
					{isLiked ? <AiFillHeart/> : <AiOutlineHeart/>}
				
				</IconContext.Provider>
				</Button>
				<Button  bg="black.100" onClick={onCommentOpen} >
				<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
			 		<MdTipsAndUpdates/>
				</IconContext.Provider >
				</Button>
				
				< WhatsappShareButton url={shareUrl}>
				<IconContext.Provider 						
					value={{color:"#14da8f",size:"22px"}}>
					 <FcShare/>
				</IconContext.Provider>

				</ WhatsappShareButton>
				
			</HStack>
			<CommentModal
			isOpen={isCommentOpen}
			onClose={onCommentClose}
			eventId={eventId}

			/>
	</CardFooter>
	</>
	)
}

export default EventFooter;