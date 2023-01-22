import { Card, CardHeader, List, ListIcon, ListItem, Skeleton, SkeletonText } from "@chakra-ui/react";
import { IconContext } from "react-icons";
import { IoMailOutline } from "react-icons/io5";

const SkeletonEvents = () => {
	  return (
		<List>
		<Skeleton isLoaded={false}>
				<Card mt={5} width="600px" height="100px" >
						<CardHeader>
							<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
							<IoMailOutline/>
					</IconContext.Provider>
					<SkeletonText width={100}></SkeletonText>
						</CardHeader>
                    <ListItem >
                          <ListIcon color='green.500' />
					<SkeletonText></SkeletonText>

                    </ListItem>
					</Card>
		</Skeleton>
				<Skeleton>
					<Card mt={5} width="600px" height="100px" >
						<CardHeader>
							<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
							<IoMailOutline/>
					</IconContext.Provider>
					<SkeletonText color="red" width={100}>
					
					</SkeletonText>
						</CardHeader>
                    <ListItem >
                          <ListIcon color='green.500' />
					<SkeletonText></SkeletonText>

                    </ListItem>
					</Card>
		</Skeleton>
		<Skeleton>
					<Card mt={5} width="600px" height="100px" >
						<CardHeader>
							<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
							<IoMailOutline/>
					</IconContext.Provider>
					<SkeletonText color="red" width={100}>
					
					</SkeletonText>
						</CardHeader>
                    <ListItem >
                          <ListIcon color='green.500' />
					<SkeletonText></SkeletonText>

                    </ListItem>
					</Card>
		</Skeleton>
		<Skeleton>
					<Card mt={5} width="600px" height="100px" >
						<CardHeader>
							<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
							<IoMailOutline/>
					</IconContext.Provider>
					<SkeletonText color="red" width={100}>
					
					</SkeletonText>
						</CardHeader>
                    <ListItem >
                          <ListIcon color='green.500' />
					<SkeletonText></SkeletonText>

                    </ListItem>
					</Card>
		</Skeleton>
		</List>
  );
};
export default SkeletonEvents;