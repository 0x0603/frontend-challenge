import { useMemo } from "react";

import { Box, Button as ChakraButton, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

import styles from "./styles.module.scss";

type ButtonProps = ChakraButtonProps & {
  children: React.ReactNode;
  styleVariant?: "gradient" | "basic";
};

const Button = ({ children, styleVariant = "basic", ...props }: ButtonProps) => {
  const styleVariantClass = useMemo(() => {
    switch (styleVariant) {
      case "gradient":
        return styles.gradient;
      default:
        return "";
    }
  }, [styleVariant]);

  return (
    <ChakraButton className={`${styles.button} ${styleVariantClass}`} {...props}>
      <Box className={styles.makeup} />
      {children}
    </ChakraButton>
  );
};

export default Button;
