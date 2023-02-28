import React from 'react';
import {useDropzone} from 'react-dropzone';
import { Box, Text, UnorderedList, ListItem, FormControl, FormLabel } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
const  Dropzone =(props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  
  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (

<FormControl mt={4}>
	<FormLabel>Upload Files</FormLabel>
  <motion.div
    {...getRootProps({ className: 'dropzone' })}
    borderWidth="2px"
    borderRadius="md"
    p="6"
    bg="gray.50"
    borderStyle="dashed"
    borderColor="gray.200"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <input {...getInputProps()} />
    <Text textAlign="center" color="gray.500">
      Drag 'n' drop some files here, or click to select files
    </Text>
  </motion.div>
  <Box mt="4">
    <Text fontSize="xl" fontWeight="semibold">
      Files
    </Text>
    <UnorderedList pl="4">
      <AnimatePresence>
        {files.map((file,i) => (
          <motion.li
          
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {files}
          </motion.li>
        ))}
      </AnimatePresence>
    </UnorderedList>
  </Box>
  </FormControl>
  );
}
export default Dropzone;