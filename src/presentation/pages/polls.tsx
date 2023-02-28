import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Heading,Stack,useToast} from "@chakra-ui/react";
import { motion } from "framer-motion";
import CreatePoll from "../organism/poll/createPoll";
import Poll from "../organism/poll/poll";
import {  Poll as PollType } from "../../domain/model/poll";
import { useAppDispatch, useAppSelector } from "../../configureStore";
import { resetCreatePollStatus,resetVoteStatus,resetAddOptionStatus ,resetDeletePollStatus} from "../../domain/usecases/poll/pollSlice";
import SideBar from "../organism/sideBar/sideBar.view";
import voteBox from "../../assets/voteBox.json";
import { Player } from "@lottiefiles/react-lottie-player";
const PollsPage = () => {
  const [polls, setPolls] = useState< PollType[]>([]);
  const auth:any = useAppSelector(state => state.auth)
  const pollState:any = useAppSelector(state => state.poll)
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [showVoteBox,setShowVoteBox] = useState(false)

  const fetchPolls = async () => {
	
	const response = await fetch(`http://localhost:3000/polls/${auth.buildingId}`);
	const data = await response.json();
	setPolls(data);
  };

  console.log("render 1")
  const handleStatus = useCallback((status: string, successMsg: string) => {
    switch (status) {
      case "failed":
        toast({
          title: `${pollState.error.error}`,
          status: "error",
          isClosable: true,
          duration: 2000,
        });
        break;
      case "succeeded":
        toast({
			position: 'bottom',
          title: successMsg,
          status: "success",
          isClosable: true,
          duration: 3200,
        });
        break;
      default:
        return;
    }
  }, [pollState.error, toast]);

  useEffect(() => {
    console.log("useeffect 1");
    handleStatus(pollState.voteStatus, "Voted successfully");
    dispatch(resetVoteStatus(null));
	
  }, [dispatch, handleStatus, pollState.voteStatus]);

  useEffect(() => {
    console.log("useeffect 2");
    handleStatus(pollState.addOptionStatus, "Option added successfully");
    dispatch(resetAddOptionStatus(null));
  }, [dispatch, handleStatus, pollState.addOptionStatus]);

  useEffect(() => {
	console.log("useeffect 3");
	handleStatus(pollState.deletePollStatus, "Poll deleted successfully");
	dispatch(resetDeletePollStatus(null));
  },[dispatch,handleStatus,pollState.deletePollStatus]);

  useEffect(() => {
    handleStatus(pollState.createPollStatus, "Poll posted successfully");
    dispatch(resetCreatePollStatus(null));
  }, [dispatch, handleStatus, pollState.createPollStatus]);

  useEffect(() => {
	console.log( "Create and delete hook")

	if(pollState.createPollStatus === "succeeded" || pollState.deletePollStatus === "succeeded")
	{	 fetchPolls()
		 dispatch(resetCreatePollStatus(null))
		 dispatch(resetDeletePollStatus(null))
	}	
}, [pollState.createPollStatus,pollState.deletePollStatus]);


useEffect(() => {
	if(pollState.addOptionStatus === "succeeded" || pollState.voteStatus === "succeeded" || pollState.deletePollStatus === "succeeded")
	{	 fetchPolls()
		 dispatch(resetCreatePollStatus(null))
		 dispatch(resetVoteStatus(null))
		
	}
},[pollState.voteStatus,pollState.addOptionStatus])


  useEffect(() => {

	fetchPolls();
	  }, []);
  
  const handleCreatePoll = async ({id,question, options}:PollType) => {
    const response = await fetch("http://localhost:3000/polls", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id, question, options }),
    });
    const newPoll = await response.json();
    setPolls([...polls, newPoll]);
  };

  return (<>
  <SideBar/>
    <Box p={4}>
      <Heading mb={4}>Polls</Heading>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
	
        {polls.map((poll) => (
          <Poll key={poll.id} poll={poll}

		   />
        ))}
      </motion.div>
    
    </Box>
	</>
  );
};

export default PollsPage;
