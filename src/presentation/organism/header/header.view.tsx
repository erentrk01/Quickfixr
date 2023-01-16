import {Flex, Show} from "@chakra-ui/react";
import { ThemeToggleLogo } from "../../molecules/headerBlock/themeToggleLogo";
import { FullBar } from "../../molecules/headerBlock/fullBar";
import { motion } from "framer-motion";


export const HeaderView = () => {

	return(
		<Flex px="20px" py="10px"  justifyContent="space-between">
		   
			<Show above='sm'>
				<FullBar/>  
			</Show>
			<ThemeToggleLogo/> 
		</Flex>
	)
}