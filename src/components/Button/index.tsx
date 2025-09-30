import { Box, Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

import styles from "./styles.module.scss";

type ButtonProps = ChakraButtonProps & {
  children: React.ReactNode;
};

const Button = ({ children, ...props }: ButtonProps) => {
  console.log(children);

  return (
    <ChakraButton className={styles.button} {...props}>
      <Box className={styles.makeup} />
      {children}
    </ChakraButton>
  );
};

export default Button;
