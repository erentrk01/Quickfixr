import {Box,Link,Checkbox,Stack,FormControl,Input,FormLabel,Button} from '@chakra-ui/react'
import {motion} from 'framer-motion'



const BuildingRegisterForm = ({handleSubmit}) => {
	const VARIANT_COLOR = 'teal'
	let easing =[0.6, -0.05, 0.01, 0.99]

	return (
		<form
		onSubmit={handleSubmit}
		>
			
			<FormControl>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:easing}}>
			  <FormLabel>Email address</FormLabel>
			  </motion.div>
			  <Input type='email' placeholder='Enter your email address' />
			</FormControl>
	
			<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
			  <FormLabel>Password</FormLabel>
			  </motion.div>
			  <Input type='password' placeholder='Enter your password' />
			  
			</FormControl>
			<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.3,ease:easing}}>
			  <FormLabel>Address</FormLabel>
			  </motion.div>
			  <Input type="text" placeholder='Enter your Building Address' />
			  
			</FormControl>
	
			<Stack isInline justifyContent='space-between' mt={4}>
				<Box>
				<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.4,ease:easing}}>
				  <Checkbox>Remember Me</Checkbox>
				  </motion.div>
				</Box>
				<Box>
				  <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
				</Box>
			</Stack>
  
		  <Button  width='full' mt={4}>Sign In</Button>
		  </form>
	)
}

export default BuildingRegisterForm;
