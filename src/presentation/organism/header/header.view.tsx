import {Flex, Show, useColorModeValue} from "@chakra-ui/react";
import { ThemeToggleLogo } from "../../molecules/headerBlock/themeToggleLogo";
import { FullBar } from "../../molecules/headerBlock/fullBar";
import { motion } from "framer-motion";


export const HeaderView = () => {
	const bg = useColorModeValue('#f0e7db',"black");

	return(
		<Flex px="20px" py="10px" position="fixed" backgroundColor={bg} zIndex={1000}  top={0.25}  w="95%" justifyContent="space-between">
		   
			<Show above='sm'>
				<FullBar/>  
			</Show>
			<ThemeToggleLogo/> 
		</Flex>
	)
}