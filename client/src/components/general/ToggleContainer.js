import { useState } from "react";

const ToggleContainer = ({ children }) => {
  const [on, setOn] = useState(false);

  const open = () => setOn(true);

  const close = () => setOn(false);

  return children({ on, open, close });
};

export default ToggleContainer;
