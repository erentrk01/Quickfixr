import { Button, Text } from "@chakra-ui/react";

const CustomButton = ({content}) =>{
	return (
		<Button  size={{sm:'sm',md:'md',lg:'lg'}} colorScheme='teal' variant='outline'>
			<Text fontSize={{ sm: '12px' }}>
				{content}
			</Text>
		</Button>
	)

}

export default CustomButton;