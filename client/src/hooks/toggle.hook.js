import { useState } from "react";

export const useToggle = (initOpen = false) => {
  const [isOpen, setIsOpen] = useState(initOpen);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
