import { Avatar, Divider, Flex, Heading ,VStack,Text, IconButton} from "@chakra-ui/react";
import { useState } from "react";

import {  IoMdMenu,IoMdHome } from 'react-icons/io';
import {FcTodoList} from 'react-icons/fc';
import NavItem from "../../molecules/sideBarBlock/navItem";
import DayNightToggle from "react-day-and-night-toggle"

const SideBar = () => {
	const [navSize, setNavSize] = useState('large');

	return (
		<Flex
			pos='absolute'
			left='0'
			h='95vh'
			marginTop='0.5vh'
			boxShadow='0px 4px 12px 0px rgba(0,0,0,0.95)'
			w={navSize == "small" ? "60px" : "200px"}
			flexDirection='column'
			justifyContent='space-between'
			borderRadius="10px 10px 10px 10px"
		>
			<Flex
				p='5%'
				flexDir='column'
				alignItems='flex-start'
				as='nav'
				borderRadius={navSize == "small" ? "15px" : "30px"}
				w={navSize == "small" ? "75px" : "200px"}
			>
				<IconButton
					aria-label="Menu"
					background="none"
					mt={5}
					_hover={{ background: "none" }}
					icon={<IoMdMenu/>}
					onClick={()=>{
						if(navSize === 'large')
							setNavSize('small')
						else
							setNavSize('large')
					}
				}
				/>
				<NavItem navSize={navSize} icon={IoMdHome} title="Dashboard"/>
				<NavItem navSize={navSize} icon={FcTodoList} title="Events"/>
				

			</Flex>
			<Flex
				p='5%'
				flexDir='column'
				w='100%'
				alignItems={navSize == "small" ? "center" : "flex-start"}
				mb={4}

			>

						<DayNightToggle
						size={navSize == "small" ? 16 :18}
						
						
						/>
				<Divider
					display={navSize == "small" ? "none" : "flex"}
				/>
				<Flex mt={4} align="center">
					<Avatar size="sm" src="avatar-1.jpg"/>
					<VStack display={navSize == "small" ? "none" : "flex"}>
						<Heading as="h3" size="sm"> Eren Tarak</Heading>

					</VStack>
				</Flex>

			</Flex>

		</Flex>	
	)
}

export default SideBar;