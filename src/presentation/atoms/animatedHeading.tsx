import { Heading } from "@chakra-ui/react"
import { motion } from "framer-motion"

interface ChildProps {
	title: string;
  }

const AnimatedHeading: React.FC<ChildProps> = ({ title }) => {
	const MotionHeading= motion(Heading)
	return (
		<MotionHeading
		initial={{ y: -150, opacity: 0 }}
		animate={{ y: 0, opacity: 1 }}
		transition={{ type: "spring", stiffness: 200 }}
		size="md"
	  >
		{title}
	  </MotionHeading>
	)
}

export default AnimatedHeading;