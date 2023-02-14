import { Avatar, Divider, Flex, Heading ,VStack,Text, IconButton, Button, useDisclosure, Tooltip} from "@chakra-ui/react";
import { useEffect, useState } from "react";


import {  IoMdMenu,IoMdHome } from 'react-icons/io';
import{SlLogout} from 'react-icons/sl';
import {SiAuth0} from 'react-icons/si';
import {IoAddCircleOutline} from 'react-icons/io5';
import {FcTodoList} from 'react-icons/fc';
import NavItem from "../../molecules/sideBarBlock/navItem";

import {resetEventCreationState} from "../../../domain/usecases/event/eventSlice";


import { useAppDispatch, useAppSelector } from "../../../configureStore";
import { IconBase, IconContext } from "react-icons";
import EventCreateView from "../event/creation/eventCreate.view";
import DaynightToggleImpl from "../../atoms/daynightToggle";

const SideBar = () => {
	const [navSize, setNavSize] = useState('small');
	const dispatch = useAppDispatch()
	const auth:any = useAppSelector(state => state.auth)
	const eventState:any= useAppSelector(state => state.event)
	//console.log(auth)
	const { isOpen, onOpen, onClose } = useDisclosure()

	const handleCloseEventCreation = () => {
		console.log("closing")
		onClose()
	}
	

	return (
		<Flex
		position="fixed" backgroundColor={"#ff63c"} zIndex={100} 
		top={20}
			
			left='0'
			h='75vh'
			marginTop='0.5vh'
			boxShadow='0px 4px 12px 0px rgba(0,0,0,0.95)'
			w={navSize == "small" ? "40px" : "200px"}
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
				
				<Tooltip label="Create Event" display={navSize =="small" ? "flex":"none"}  placement='auto-start' aria-label="A tooltip">
					<Button mt={3}
					onClick={onOpen}>
						<IconContext.Provider  value={{color:"yellow",size:"22px"}}>
							<IoAddCircleOutline/>
						</IconContext.Provider>
					</Button>
				</Tooltip>
				<EventCreateView 
					isOpen={isOpen}
					onClose={ handleCloseEventCreation}
				 />
				<NavItem  navSize={navSize} icon={SlLogout} title="Logout"/>
			</Flex>
			<Flex
				p='5%'
				flexDir='column'
				w='100%'
				alignItems={navSize == "small" ? "center" : "flex-start"}
				mb={4}

			>
				<DaynightToggleImpl size={16} />
				<Divider
					display={navSize == "small" ? "none" : "flex"}
				/>

				<Flex mt={5} align="center">
					<Tooltip label={auth.name} display={navSize =="small" ? "flex":"none"}  placement='auto-start' aria-label="A tooltip">
						<Avatar size="sm" src="avatar-1.jpg"/>
					</Tooltip>
					<VStack ml={2} alignItems={"center"} display={navSize == "small" ? "none" : "flex"}>
						{	auth.isManager &&
							<IconContext.Provider  value={{color:"#14da8f",size:"22px"}}>
			 					<SiAuth0/>
							</IconContext.Provider >
						}
						<Heading as="h3" size="sm">{auth.name} </Heading>
					</VStack>
				</Flex>

			</Flex>
		</Flex>
	)
}

export default SideBar;