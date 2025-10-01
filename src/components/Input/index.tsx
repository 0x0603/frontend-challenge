import { forwardRef } from "react";

import { Box, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";

import styles from "./styles.module.scss";

interface InputProps extends Omit<ChakraInputProps, "size"> {
  label?: string;
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, success, leftIcon, rightIcon, size = "medium", required, className, ...props },
    ref,
  ) => {
    const getSizeClass = () => {
      switch (size) {
        case "small":
          return styles.small;
        case "large":
          return styles.large;
        default:
          return "";
      }
    };

    const getStatusClass = () => {
      if (error) return styles.error;
      if (success) return styles.success;
      return "";
    };

    const getIconClass = () => {
      let classes = "";
      if (leftIcon) classes += ` ${styles.withIcon}`;
      if (rightIcon) classes += ` ${styles.withRightIcon}`;
      return classes;
    };

    const inputClasses = [styles.input, getSizeClass(), getStatusClass(), getIconClass(), className]
      .filter(Boolean)
      .join(" ");

    return (
      <Box className={styles.inputContainer}>
        {label && (
          <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <Box position="relative">
          {leftIcon && <Box className={`${styles.icon} ${styles.left}`}>{leftIcon}</Box>}

          <ChakraInput ref={ref} className={inputClasses} {...props} />

          {rightIcon && <Box className={`${styles.icon} ${styles.right}`}>{rightIcon}</Box>}
        </Box>

        {error && <Box className={styles.errorMessage}>{error}</Box>}
      </Box>
    );
  },
);

Input.displayName = "Input";

export default Input;
