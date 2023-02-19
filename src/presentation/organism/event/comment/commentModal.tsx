import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Box,
  Avatar,
  Text,
  HStack,
  useToast,
  IconButton,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  Portal,
  ButtonGroup
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import {addComment,deleteComment,getEventComments,resetDeleteCommentStatus} from "../../../../domain/usecases/comment/commentSlice";
import {TbDotsVertical} from "react-icons/tb"
import {DeleteIcon,EditIcon} from "@chakra-ui/icons"
import moment from "moment";

const CommentModal = ({ isOpen, onClose, eventId}) => {

  const dispatch = useAppDispatch();
  const [commentContent, setCommentContent] = useState('');
  const commentState:any= useAppSelector((state) => state.comments);
  const[comments,setComments]=useState([]);

  const { isOpen:isEditOpen, onToggle, onClose:editOnClose } = useDisclosure()

  const [name, setName] = useState("");


const toast = useToast();
const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
	

	// prevent double submission
	if (isSubmitting) {
	  return;
	}
  
	setIsSubmitting(true);
	dispatch(addComment({ eventId, content: commentContent }));
	setIsSubmitting(false);
    setCommentContent('');

  };

  const handleDeleteComment = async (eventId,commentId) => {
	console.log(eventId)
   await dispatch(deleteComment({eventId,commentId}));
	dispatch(getEventComments(eventId));
  };

  useEffect(() => {
	if (isOpen) {
	  dispatch(getEventComments(eventId));
	}
  }, [isOpen, eventId, dispatch]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
		<ModalBody>
          <VStack spacing="4" mb="4">
            {commentState.comments.map((comment, i) => (
              <Box
                key={i}
                p="3"
                borderRadius="lg"
                boxShadow="md"
                w="100%"
                maxW="sm"
              >
				  <motion.div
			   initial={{ opacity: 0 }}
			   animate={{ opacity: 1}}
			   transition={{ duration: 0.5, delay: 0.2 }}
			  >
                <HStack >
                  <Avatar size="sm" name={comment.user.name} />
                  <Text fontWeight="semibold">{comment.content}</Text>
				  <Spacer />
				  <Popover
					placement='top'
					closeOnBlur={false}

				  >
					<PopoverTrigger>
				
				  <IconButton
				  bg={"black.600"}
					icon={<TbDotsVertical color="white" />}
					borderRadius={12} 
					size="sm" 
					aria-label='edit'
					colorScheme='green'
					onClick={onToggle}
				  >
					edit
				  </IconButton>
					</PopoverTrigger>
					<PopoverContent
					
					bg={"black.600"}
					width="100px"

					>
         
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
			<HStack>
			<motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
           <IconButton
		   		aria-label='edit'
				colorScheme='yellow'
				icon={<EditIcon color="green"/>}

		   >
				Edit
		   </IconButton>
		   </motion.div>
		   <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
		   <IconButton
			
			icon={<DeleteIcon color="green"/>}
					borderRadius={12}
					colorScheme='yellow'
					
					aria-label='delete'
					onClick={()=>handleDeleteComment(eventId,comment._id)}
				
		   >
				Delete
			</IconButton>
			</motion.div>
			</HStack>
          </PopoverBody>
        </PopoverContent>
				  

				  </Popover>
                </HStack>
				</motion.div>
				<Text fontSize="sm" mt="2">{moment(comment.createdAt).fromNow()}</Text>
                <Text></Text>
              </Box>
            ))}
          </VStack>
		  <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
     
    >
          <form onSubmit={handleSubmit}>
  
            <FormControl id="comment" mb="4">
			<motion.FormLabel
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Comment
        </motion.FormLabel>
              
              <motion.div
			   initial={{ opacity: 0 }}
			   animate={{ opacity: 1}}
			   transition={{ duration: 0.5, delay: 0.4 }}
			  >
				
				<Textarea
			   
                value={commentContent}
                onChange={(event) => setCommentContent(event.target.value)}
              />
			  </motion.div>
            </FormControl>
			
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button type="submit" colorScheme="blue">
                Add Comment
              </Button>
            </motion.div>
          </form>
		  </motion.div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentModal;