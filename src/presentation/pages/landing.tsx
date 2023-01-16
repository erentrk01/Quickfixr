import {  Flex,Heading, HStack, Image, VStack,Show,Hide} from "@chakra-ui/react";
import {useColorModeValue} from "@chakra-ui/color-mode";

import {motion} from "framer-motion"


import { ReactComponent as Contact} from '../../assets/contact.svg'

import landing1Light from "../../assets/landing1Light.json"
import landing1Dark from "../../assets/landing1Dark.json"
import CustomButton from "../atoms/customButton";
import ServiceCardsView from "../organism/serviceCards/serviceCards.view";
import { Player}  from '@lottiefiles/react-lottie-player';




 const Landing = ()=>{

const data = useColorModeValue(landing1Light,landing1Dark)

// animation settings



	return(
		<>
		<Flex alignItems="center">
		<Hide below="sm">
		<Player
			src={data}
			className="player"
			loop
			autoplay
			style={{ height: '400px', width: '80%' }}


		/>
		</Hide>
		<Show below="sm">
		<Player
			src={data}
			className="player"
			loop
			autoplay
			style={{ height: '100px', width: '100px' }}


		/>
		</Show>
		

		<VStack>
		<Heading fontSize={{ sm: '22px', md: '24px', lg: '36px' }} >Efficiency in maintenance, excellence in service. </Heading>
		<HStack>
			<CustomButton content={"Ücretsiz Deneyin"}/>
			<CustomButton content={"Daha Fazla Bilgi Edinin"}/>
		</HStack>

		</VStack>

		</Flex>

	
		<Contact
			width="200px"
			height="200px"
		/>
		<ServiceCardsView/>
		</>
	)

}

export default Landing;