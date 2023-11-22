import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const PORT = import.meta.env.VITE_REACT_APP_PORT;

  const handleClick = () => setShow(!show);

  const postDetails = async (pics) => {
    setLoading(true);
    if (!pics) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const preset = import.meta.env.VITE_REACT_APP_PRESET_NAME;
      const cloudName = import.meta.env.VITE_REACT_APP_CLOUD_NAME;

      try {
        const formData = new FormData();
        formData.append("file", pics);
        formData.append("upload_preset", preset);

        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        setLoading(false);
        setPic(response?.data?.url);
        console.log(typeof response?.data?.url);
        console.log(pic);
        console.log("Image uploaded successfully:", response?.data?.url);
      } catch (error) {
        console.error("Error uploading image:", error);
        setLoading(false);
      }
    } else {
      toast({
        title: "Please Select a valid Image (JPEG/PNG)",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${PORT}/api/v1/user/register`,
        { name, email, password, pic },
        config
      );
      toast({
        title: "Register Successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.8rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h={"1.8rem"} size={"sm"} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          placeholder="upload your picture"
          accept="image/*"
          type="file"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        width={"100%"}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
