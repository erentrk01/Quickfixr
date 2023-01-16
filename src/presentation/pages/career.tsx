
import { Heading } from "@chakra-ui/react";
import JotFormReact from  'jotform-react';
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { Box } from "@chakra-ui/react";


export const Career = ()=>{
	return(
		<>
			<Box px="20px">
				<Logo
					width="200px"
					height="200px"
				/>	
		
				<Heading fontSize={{ base: '18px', md: '24px', lg: '32px' }}>
					Quickfixr Ekibine Katılın. CV’nizi Gönderin.
				</Heading>
				<JotFormReact
					style={{color:"red"}}
					formURL="https://form.jotform.com/230114669848968"/>
			</Box>
		</>
	)

}