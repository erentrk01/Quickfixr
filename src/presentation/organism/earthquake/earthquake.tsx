import { Box,Text, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
const Earthquake = () => {

	const [earthquake, setEarthquake] = useState<any>();
	const[count,setCount]=useState(0)

	useEffect(() => {
		// Get user's current position
		navigator.geolocation.getCurrentPosition(
		  position => {
			const { latitude, longitude } = position.coords;
			console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
	
			// Make request to earthquake API using user's coordinates
			const options = {
			  method: 'GET',
			  url: 'https://everyearthquake.p.rapidapi.com/latestEarthquakeNearMe',
			  params: {latitude,longitude},
			  headers: {
				'X-RapidAPI-Key': 'faad1ace3cmsha96006b077efb08p1f176djsnb927a8e5c68b',
				'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
			  }
			};
	
			axios.request(options).then(function (response) {
			  console.log(response.data);
			  setEarthquake(response.data.data)
			  setCount(response.data.count)
			  console.log(earthquake)
			}).catch(function (error) {
			  console.error(error);
			});
		  },
		  error => {
			console.error(error);
		  }
		);
	  }, []);
	
	  return (
<Box

  p={4}
>
  {count > 0 ? (
    <>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        {count} Earthquakes Found
      </Text>
      <VStack spacing={4}>
        {earthquake.map((item: any) => (
          <motion.div
            key={item.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Box
              bg="green.500"
              borderRadius="40px"
              boxShadow="md"
              p={5}
              width="100%"
              maxW="600px"
              cursor="pointer"
          
            >
              <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Magnitude: {item.title}
              </Text>
              <Text fontSize="md" mb={2}>
                Date: {item.date}
              </Text>
            </Box>
          </motion.div>
        ))}
      </VStack>
    </>
  ) : (
    <Box>
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        No earthquakes found.
      </Text>
    </Box>
  )}
</Box>
		)


};
export default Earthquake;