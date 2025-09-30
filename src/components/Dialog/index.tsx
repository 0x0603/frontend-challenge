import type React from "react";

import {
  DialogBackdrop,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  IconButton,
} from "@chakra-ui/react";

type RootProps = React.ComponentProps<typeof DialogRoot>;
type DialogProps = Omit<RootProps, "open" | "onOpenChange" | "children"> & {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  hideCloseButton?: boolean;
};

const Dialog = ({
  children,
  open,
  onClose,
  title,
  footer,
  hideCloseButton = false,
  placement = "center",
  motionPreset = "slide-in-bottom",
  ...props
}: DialogProps) => {
  return (
    <DialogRoot
      open={open}
      onOpenChange={({ open: isOpen }) => {
        if (!isOpen) onClose();
      }}
      placement={placement}
      motionPreset={motionPreset}
      {...props}
    >
      <DialogBackdrop bg="rgba(0, 0, 0, 0.8)" blur="6px" />
      <DialogPositioner>
        <DialogContent
          gap="24px"
          bg="var(--background-dialog)"
          borderRadius="8px"
          padding="32px 24px"
        >
          {title || !hideCloseButton ? (
            <DialogHeader
              padding="0"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <DialogTitle fontSize="22px" fontWeight="600">
                {title}
              </DialogTitle>
              {!hideCloseButton && (
                <IconButton
                  aria-label="Close dialog"
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  position="absolute"
                  color="var(--text)"
                  fontSize="20px"
                  backgroundColor="rgba(255, 255, 255, 0.1)"
                  transition="all 0.2s ease-in-out"
                  _hover={{ transform: "scale(1.1)", opacity: 0.8 }}
                  style={{ zIndex: 1000, position: "absolute", top: "12px", right: "12px" }}
                >
                  ✕
                </IconButton>
              )}
            </DialogHeader>
          ) : null}

          <DialogBody maxH="70dvh" overflowY="auto" padding="0" className="hide-scrollbar">
            {children}
          </DialogBody>
          {footer ? <DialogFooter>{footer}</DialogFooter> : null}
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
};

export default Dialog;
