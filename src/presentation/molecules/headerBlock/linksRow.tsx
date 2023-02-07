import { NavLink } from "react-router-dom";
import { Link} from "@chakra-ui/react";

 const LinksRow = () => {
	return(
		<>
			<Link as={NavLink} to="/">Home</Link>
			<Link as={NavLink} to="/login">Login</Link>
			<Link as={NavLink} to="/register">Register</Link>
			<Link>About</Link>
			<Link>Services</Link>
			<Link as={NavLink} to="/career">Career</Link>
			
		</>
	)
}

export default LinksRow;