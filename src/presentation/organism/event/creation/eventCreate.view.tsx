import {Textarea, Modal,ModalBody,ModalContent,ModalCloseButton,ModalFooter,ModalHeader,Button,ModalOverlay,Text,Stack,Box, FormControl, FormLabel, Input, Select, Spinner, Toast, useToast} from "@chakra-ui/react";
import {motion} from "framer-motion"
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import { addPostToDB } from "../../../../domain/usecases/event/eventSlice";
import {resetEventCreationState} from "../../../../domain/usecases/event/eventSlice";


const EventCreateView = ({isOpen,onClose}) => {

	const dispatch = useAppDispatch()
	let eventState:any = useAppSelector(state => state.event)
	const auth = useAppSelector(state => state.auth)
	const { token } = auth;
	const config = { headers: { Authorization: `Bearer ${token}` } };
	const toast = useToast();



	const VARIANT_COLOR = 'teal'
	let easing =[0.6, -0.05, 0.01, 0.99]
	 const[event,setEvent] =useState({
		title:'',
		description:'',
		functionalArea:'',
		serviceContactPhone:'',
		condition:'pending',
		date: new Date(),
	});


	
	useEffect(() => {
		console.log("event creation status:" +eventState.eventCreationStatus)
		if (eventState.eventCreationStatus === "success") {
			toast({
                title: `Event posted successfully`,
                status: "success",
                isClosable: true,
				duration: 2000
              })

			  dispatch(resetEventCreationState(null))
            }
		  },[eventState.eventCreationStatus ])

	

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("create button clicked")
		console.log("condition:" +event.condition)
		dispatch(addPostToDB(event))
		onClose()
		


	}


	return (
		<>
			<Modal 
				isCentered  
				motionPreset='slideInBottom' 
				blockScrollOnMount={false}
				isOpen={isOpen} 
				onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Create Event</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<FormControl>
								<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:easing}}>
								<FormLabel>Title</FormLabel>
								</motion.div>
								<Input type='text' placeholder='Enter the title'
									onChange={(e) => setEvent({ ...event, title: e.target.value })}/>
							</FormControl>

							<FormControl mt={3}>
								<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
									<FormLabel>Description</FormLabel>
								</motion.div>
								<Textarea 
									placeholder='Enter the description'  
									onChange={(e) => setEvent({ ...event, description: e.target.value })}/>
								</FormControl>

								<FormControl mt={3}>
									<FormLabel>Condition</FormLabel>
									<Select 
										onChange={(e) => setEvent({ ...event, condition: e.target.value })}
										variant='filled' 
										placeholder='pending'>
											<option value='in progress'>in progress</option>
											<option value='done'>done</option>
									</Select>
								</FormControl>

								<FormControl mt={3}>
									<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
									<FormLabel>Functional Area</FormLabel>
									<Input type='text' placeholder='Enter the functional area'
										onChange={(e) => setEvent({ ...event, functionalArea: e.target.value })}/>
									</motion.div>
								</FormControl>

								<FormControl mt={3}>
									<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
									<FormLabel>Contact</FormLabel>
										<Input type='text' placeholder='Enter the contact phone'
											onChange={(e) => setEvent({ ...event, serviceContactPhone: e.target.value })}/>
									</motion.div>
									
								</FormControl>
								{
								(eventState.eventCreationStatus =="pending") && <Spinner mt={1}
								thickness='4px'
								speed='0.65s'
								emptyColor='gray.200'
								color={`${VARIANT_COLOR}.500`}
							/>
							}
							</ModalBody>
						
							<ModalFooter>
								<Button colorScheme='blue' mr={3} onClick=		{onClose}>
										Close
								</Button>
								<Button onClick={handleSubmit} variant='ghost'>Create</Button>
							</ModalFooter>
					</ModalContent>
			</Modal>
		</>
	)
}

export default EventCreateView;