import {Textarea, Modal,ModalBody,ModalContent,ModalCloseButton,ModalFooter,ModalHeader,Button,ModalOverlay,Text,Stack,Box, FormControl, FormLabel, Input, Select} from "@chakra-ui/react";
import {motion} from "framer-motion"
import { useState } from "react";
import { Link } from "react-router-dom";

const EventCreateView = ({isOpen,onClose}) => {
	const VARIANT_COLOR = 'teal'
	let easing =[0.6, -0.05, 0.01, 0.99]
	 const[event,setEvent] =useState({
		title:'',
		description:'',
		functionalArea:'',
		serviceContactPhone:'',
		condition:'',
		date:""
	});

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
										variant='filled' 
										placeholder='pending'>
											<option value='option1'>in progress</option>
											<option value='option2'>done</option>
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

							</ModalBody>
							<ModalFooter>
								<Button colorScheme='blue' mr={3} onClick=		{onClose}>
										Close
								</Button>
								<Button variant='ghost'>Create</Button>
							</ModalFooter>
					</ModalContent>
			</Modal>
		</>
	)
}

export default EventCreateView;