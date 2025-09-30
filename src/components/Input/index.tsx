import { Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

type InputProps = ChakraInputProps;

const Input = ({ ...props }: InputProps) => {
  return <ChakraInput {...props} />;
};

export default Input;
