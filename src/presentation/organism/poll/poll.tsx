import React, { FC, useEffect, useState } from "react";
import{useNavigate} from "react-router-dom";
import {
	useMediaQuery ,
  Box,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  Progress,
  useToast,
  IconButton,
  HStack,
  SimpleGrid,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {AddIcon,DeleteIcon,TimeIcon} from "@chakra-ui/icons"

import { Poll as PollType } from "../../../domain/model/poll";
import { Option } from "../../../domain/model/option";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import {deletePoll,votePoll,addOption} from "../../../domain/usecases/poll/pollSlice";


import { IconContext } from "react-icons";

interface PollProps {
	  poll: PollType;
	}

	
const Poll: FC<PollProps> = ({ poll}) => {
	const[isExpired,setIsExpired] = useState(poll.isExpired)
  const [pollState, setPollState] = useState<PollType | null >(null);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [pollOptions, setPollOptions] = useState<any>(poll.options);
  const dispatch = useAppDispatch();
  const [showNewOption, setShowNewOption] = useState(false);
  const [newOptionText, setNewOptionText] = useState("new");
  const [isSmallerThanMobile] = useMediaQuery("(max-width: 30em)");
  const toast = useToast();
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();


  const handleOptionTextChange = (index, newText) => {
    const newOptions = [...poll.options];
    newOptions[index].text = newText;
    setPollOptions(newOptions);
  };
  const openAddOption = () => {
	
	setShowNewOption(!showNewOption);

  }

  const handleAddOption = () => {
	
	console.log("add option")
    const newOption: Option = {_id:null, id: poll.options.length + 1, text: newOptionText, votes: 0 };
    setPollOptions([...pollOptions, newOption]);
	dispatch(addOption({pollId:poll._id,option:newOption}))
  };

  const handleVote = () => {
	console.log(selectedOption); 
	if (selectedOption === null || isExpired) {
		return;
	  }

	
	
	  const updatedOptions = poll.options.map((option) => {
		if(option._id === selectedOption._id){
		dispatch(votePoll({pollId:poll._id,optionId:option._id}))
		}
	  });
	
	  setPollOptions(updatedOptions);
	  setSelectedOption(null);
  };

  const handleDeletePoll = (pollId) => {
	dispatch(deletePoll({pollId}))
  }

  const variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  hidden: { opacity: 0, y: 50 },
};



const optionVariants = {
	hidden: { opacity: 0, x: -50 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };
  
  const buttonVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  let easing =[0.175, 0.85, 0.42, 0.96];


  return (
    <motion.div
      variants={variants}
      animate="visible"
      style={{ width: "100%" }}
	  initial={{ opacity: 0 }}
	whileInView={{ opacity: 1 }}
    >
    
   <Box p={4}  mt={8} borderWidth="3px" borderRadius="md"   onMouseEnter={() => setHovering(true)}
    position="relative"
  onMouseLeave={() => setHovering(false)}>
		
			<Heading   color="#45292d
"  borderRadius={15}  mx="auto"  width="50%" px={4} bg='orange.300' padding={2} size="md" mb={4}>
        {poll.question}
      </Heading>


		<VStack>
			<Box bottom={2} left={2} >
			  <IconContext.Provider value={{ color: "blue", size: "2em" }}  >
	<TimeIcon />
	{isExpired  ?
	(<>
		<Text>Voting period over </Text>
		<Text>{poll.remainingTime} ago</Text>
		</>
	)
	:(	<>
	<Text>Voting ends in</Text>
	<Text>	{poll.remainingTime}</Text>
	</>
	)
}

	</IconContext.Provider>


	</Box>

	</VStack>



			  <HStack p={2} >
			<IconButton
				size="sm"
				aria-label="Add Option"
				icon={<AddIcon />}
				onClick={openAddOption}
				variant="outline"
				colorScheme="yellow"
				_hover={{ bg: "blue.500" }}
			  />
			    <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate={showNewOption ? "visible" : "hidden"}
      >
			<Button
			 onClick={handleAddOption} >
			  Add Option
			</Button>
			</motion.div>
			

			</HStack>
			{hovering && (
	<Tooltip label="Delete poll" aria-label="Delete poll" placement="left" borderRadius={5} >
    <IconButton
      aria-label="Delete poll"
      icon={<DeleteIcon />}
	  _hover={{ bg: "red.500" }}
	  onClick={() => handleDeletePoll(poll._id)}
      size="md"
      position="absolute"
      right="0"
      top="0"
      visibility={hovering ? 'visible' : 'hidden'}
    />
	</Tooltip>
  )}

	  <HStack px={2}>
		 <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate={showNewOption ? "visible" : "hidden"}
        style={{ display: "flex", alignItems: "center" }}
      >
	  <FormControl mt={1}>
		 <Input
		    placeholder="Enter new option"
			fontSize="lg"
			color="gray.400"
            type="text"
            onChange={(e) => setNewOptionText( e.target.value)}
          />
	

	  </FormControl>
	  </motion.div>

	  </HStack>

	
   {poll.options.map((option) => (
    <Box key={option._id} mb={4}>
        <Button
            onClick={() => setSelectedOption(option)}
			bg={selectedOption === option ? 'pink.500' : 'gray.400'}
			color={selectedOption === option ? 'white' : 'black'}
			_hover={{ bg: selectedOption === option ? 'pink.600' : 'yellow.300' }}
			_active={{ bg: selectedOption === option ? 'pink.700' : 'gray.700' }}
			transition="background-color 0.2s"
          
        >
            {option.text}
        </Button>
        {poll.voteCount > 0 ? (
            <Box display="flex" alignItems="center" px={2} >
                <Box
                    width="100%"
                    backgroundColor="gray.500"
                    height="10px"
                    position="relative"
                >
					 <motion.div
                initial={{ width: `${(option.votes / poll.voteCount) * 100}%` }}
                animate={{
                    width: `${(option.votes / poll.voteCount) * 100}%`,
                    transition: { duration: 0.5 ,ease: easing,},
                }}
                style={{
                    backgroundColor: "#8FE298",
                    height: "10px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                }}>
                    <Progress
						
                        value={(option.votes / poll.voteCount) * 100}
                        colorScheme="green"
                        height="10px"
                        style={{
                            visibility:
                                option.votes === 0 ? "hidden" : "visible",
                        }}
                    />
					</motion.div>
                    {option.votes === 0 && (
                        <Box
                            position="absolute"
                            top="0"
                            left="0"
                            bottom="0"
                            right="0"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="gray.400"
                        >

                        </Box>
                    )}
                </Box>
                <Text fontSize="sm" ml={2}>
                    {`${Math.round((option.votes / poll.voteCount) * 100)}% (${option.votes} votes)`}
                </Text>
            </Box>
        ) : (
            <Box
			marginTop={4}
                width="100%"
                backgroundColor="gray.500"  // update the background color to gray.50
                height="10px"
                position="relative"
            >
                <Progress
                    value={0}
					colorScheme="teal"
                    height="10px"
                />
            </Box>
        )}
    </Box>
))}
<Box mt={7} >

<Tooltip 
borderRadius={10}
placement="top"
bg={selectedOption === null ? "red.300" : "blue.300"}
label={selectedOption === null ? "You must select an option to vote" : `Vote for ${selectedOption.text}`} aria-label="A tooltip">
      <Button  onClick={handleVote}
  disabled={selectedOption === null}
  visibility={isExpired? 'hidden' : 'visible'}
  size="lg"
  backgroundColor="blue.500"
  color="white"
  _hover={{ backgroundColor: "blue.600" }}
  _active={{ backgroundColor: "blue.700" }}
  _disabled={{ backgroundColor: "gray.400", cursor: "not-allowed" }}
  mt={2}>
        Vote
      </Button>
</Tooltip>

</Box>

{isSmallerThanMobile ? (

  <Box textAlign="center" mt={4}>
    <Text fontSize="sm">Created by {poll.ownerName}</Text>
  </Box>

):(

	<Text px={2} fontSize="sm" position="absolute" bottom={2} right={2}>
  Created by {poll.ownerName}
</Text>
)}
</Box>
	</motion.div>
  );
};

export default Poll;