import {Box,Heading,Text,Link,} from '@chakra-ui/react'
import {motion} from 'framer-motion'


export const LoginHeader = () => {
	const VARIANT_COLOR = 'teal'
	let easing =[0.6, -0.05, 0.01, 0.99]

	return (
	  <Box textAlign='center'>
				<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.3,ease:easing}}>
					<Heading>Sign In to Your Account</Heading>
				</motion.div>
		<Text>
		  Or <Link color={`${VARIANT_COLOR}.500`}>start your 14 days trial</Link>
		</Text>
	  </Box>
	)
  }