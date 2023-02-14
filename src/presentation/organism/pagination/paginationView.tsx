import { Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
const PaginationView=({ currentPage, totalPages, onPageChange })=> {
	const buttonVariants = {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	  };
	
	  const buttons = [];
	
	  for (let i = 1; i <= totalPages; i++) {
		buttons.push(
		  <motion.button
			key={i}
			variants={buttonVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.2 }}
			whileHover={{ scale: 1.1 }}
			whileTap={{ scale: 0.9 }}
			bg={i === currentPage ? "blue.500" : "gray.200"}
			color={i === currentPage ? "white" : "gray.800"}
			size="sm"
			onClick={() => onPageChange(i)}
		  >
			{i}
		  </motion.button>
		);
	  }
	
	  return (
		<Stack direction="row" spacing={4} align="center">
		  {buttons}
		</Stack>
	  );
  }
  
  export default PaginationView;