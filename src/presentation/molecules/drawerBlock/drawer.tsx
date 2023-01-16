import { Flex,DrawerContent,DrawerCloseButton,DrawerFooter,Text,Drawer, DrawerBody, DrawerHeader, DrawerOverlay } from "@chakra-ui/react";

interface IProps {
	p:number,
	placement: "right" | "left" | "top" | "bottom";
	width?: string;
	btnRef?: React.RefObject<HTMLButtonElement>,
	finalFocusRef?:  React.RefObject<HTMLButtonElement>,
	title: string,
	isOpen: boolean,
	onClose: () => void,
	children: React.ReactNode
}

export const MyDrawer: React.FC<IProps> = ({
	p =15,
	placement = "right",
	width,
	isOpen,
	children,
	onClose,
	btnRef,
	title = "Menu"
}:IProps) => {
  return (
	<Flex w={width}>
	<Drawer
		isOpen={isOpen}
		placement={placement}
		onClose={onClose}
		finalFocusRef={btnRef}
>
		<DrawerOverlay />
		<DrawerContent alignItems="center">
		<DrawerCloseButton alignSelf="end" mx={p} my={p} />
		<DrawerHeader my={p}>
		<Text as="p"> {title} </Text>
		</DrawerHeader>
		<DrawerBody>{children}</DrawerBody>
	</DrawerContent>
	</Drawer>
</Flex>
  );
};

export default MyDrawer;

