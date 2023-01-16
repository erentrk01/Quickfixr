
import { NavLink } from "react-router-dom";
import { useRef } from "react";

import {Image, useDisclosure, Flex, Box, Button,  VStack, Icon, HStack, Link as ChakraLink } from "@chakra-ui/react";

import { MyDrawer} from "./drawer"
import {  IoMdMenu } from 'react-icons/io';
import { Link } from 'react-scroll';
import headerData from "./header.data";



export default function MobileDrawer( ) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const btnRef = useRef<HTMLButtonElement>(null);

	const decapitalizeFirstLetter = (string)=> {
		return string.charAt(0).toLowerCase() + string.slice(1);
	}

	return (
		<Flex display={{  sm: "block" ,lg:"none"}}>
			<Button   onClick={onOpen}>
				<IoMdMenu   size="26px" />
			</Button>

		<MyDrawer
			p={15}
			placement="right"
			title="Menu"
			isOpen={isOpen} 
			onClose={onClose} 
			finalFocusRef={btnRef}
			>

			<VStack alignItems="left">

				{headerData.map((item, i:number) => (
				<Link key={i} >
				<ChakraLink as={NavLink} to={"/"+decapitalizeFirstLetter(item.label)}>
						<Button variant='text' > {item.label} </Button>
				</ChakraLink> 
			</Link>
			))}

			</VStack>
			

		</MyDrawer>
	</Flex>
	);
};

