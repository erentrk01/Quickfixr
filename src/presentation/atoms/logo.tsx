import { motion} from "framer-motion";
import {Heading } from '@chakra-ui/react'
import foto from './fotor.png'

export const Logo = () => {
	return(
		<motion.div
			 initial={{ y: -250}}
			animate={{ y: -10 }}
			transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
		>
			<Heading as="h3" fontSize={{ "sm":"24px" }} >Quickfixr</Heading>
		</motion.div>
	)
}