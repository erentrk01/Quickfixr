import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import {HStack,SimpleGrid,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Input,
  Text,
  Spacer,
  FormControl,
  FormLabel,
  Box,
  VStack,
} from "@chakra-ui/react";
import{DeleteIcon,AddIcon} from "@chakra-ui/icons"

import { Option } from "../../../domain/model/option";
import { Poll } from "../../../domain/model/poll";
import { useAppDispatch } from "../../../configureStore";
import { addPoll, deleteOption, updateOption,addOption } from "../../../domain/usecases/poll/pollSlice";

import { ReactComponent as AnketSvg } from '../../../assets/anket.svg'
import { SiApacherocketmq } from "react-icons/si";

interface CreatePollProps {
	onSubmit: (poll:Poll) => Promise<void>;
	isOpen:boolean;
	onClose:()=>void;
}

const CreatePoll:FC<CreatePollProps> = ({ onSubmit,isOpen,onClose}) => {

	const [question, setQuestion] = useState("");
	const [options, setOptions] = useState(["", ""]);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [duration, setDuration] = useState<{ days: number; hours: number }>({
		days: 0,
		hours: 0,
	  });
	const [durationDays, setDurationDays] = useState(0);
	const [durationHours, setDurationHours] = useState(0);
	
  
	const handleAddOption = () => {
	  setOptions([...options, ""]);
	};
  
	const handleDeleteOption = (index) => {
	  const newOptions = [...options];
	  newOptions.splice(index, 1);
	  setOptions(newOptions);
	  dispatch(deleteOption(index));
	};
  
	const handleUpdateOption = (index, value) => {
	  const newOptions = [...options];
	  newOptions[index] = value;
	  setOptions(newOptions);
	  dispatch(updateOption({ index, value }));
	};
  
	const handleSubmit = async () => {
	  setIsLoading(true);
	  await dispatch(addPoll({ question, options,durationDays,durationHours }));
	  setIsLoading(false);
	  onClose();
	  navigate("/Polls")
	};
  
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />

		<ModalContent>
		<motion.div 
			initial={{ opacity: 0 }} 
			animate={{ opacity: 1 }}
			transition={{ duration: 0.6}}>
		  <ModalHeader>Create a New Poll</ModalHeader>
		  <ModalBody>
		
		  <motion.div 
					initial={{ y: 20, opacity: 0 }} 
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.2 }}>
			<Input
			  placeholder="Enter your question"
			  mb="4"
			  value={question}
			  onChange={(e) => setQuestion(e.target.value)}
			/>
			</motion.div>
<SimpleGrid columns={2} spacing={1}>		
	
			<AnketSvg
					height="100%"
					width="100%"
				/>
			<VStack>
			{options.map((option, index) => (
			  <Flex key={index} >



				<motion.div 
						initial={{ y: 20, opacity: 0 }} 
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.2 + index/10 }}>
				<Input
				  placeholder="Enter an option"
				  value={option}
				  onChange={(e) => handleUpdateOption(index, e.target.value)}
				/>
				</motion.div>
				<Box ml="2">
				  <Button
				    variant="ghost"
				    colorScheme="red"
				    size="sm"
				    onClick={() => handleDeleteOption(index)}
				  >
				    <DeleteIcon />
				  </Button>
				</Box>
			  </Flex>
			))}
			
		

				<motion.div 
					initial={{ y: 20, opacity: 0 }} 
					animate={{ y: 0, opacity: 1 }}
					transition={{ delay: 0.4 }}>
			<Box px={4}>
			<Button
			borderRadius="full"
			onClick={handleAddOption}>Add Option</Button>
			</Box>
			</motion.div>
			</VStack>
			</SimpleGrid>
			<Flex mt="2" >
			  <FormControl isRequired>
				<FormLabel>Duration (Days)</FormLabel>
				<motion.div 
						initial={{ y: 20, opacity: 0 }} 
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.6 }}>
				<Input
				  type="number"
				  placeholder="Enter the duration in days"
				  value={durationDays}
				  onChange={(e) => setDurationDays(parseInt(e.target.value))}
				/>
				</motion.div>
			  </FormControl>
			  <Spacer />
			  <FormControl isRequired>
				<FormLabel>Duration (Hours)</FormLabel>
				<motion.div 
						initial={{ y: 20, opacity: 0 }} 
						animate={{ y: 0, opacity: 1 }}
						transition={{ delay: 0.6 }}>
				<Input
				  type="number"
				  placeholder="Enter the duration in hours"
				  value={durationHours}
				  onChange={(e) => setDurationHours(parseInt(e.target.value))}
				/>
				</motion.div>
			  </FormControl>
			</Flex>
		  </ModalBody>
		  <ModalFooter>
			<Button variant="ghost" mr={3} onClick={onClose}>
			  Cancel
			</Button>
			<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
			  <Button colorScheme="blue" onClick={handleSubmit} isLoading={isLoading}>
				Create
			  </Button>
			</motion.div>
		  </ModalFooter>
		  </motion.div>
		</ModalContent>
	  </Modal>)

	};
	export default CreatePoll;
