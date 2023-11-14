import { FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";
import React from "react";

const SignUp = () => {
  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder="Enter Your Name" />
      </FormControl>
    </VStack>
  );
};

export default SignUp;
