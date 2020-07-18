import React from "react";
import { BookmarkProvider } from "./BookmarkProvider";

const AuthenticatedProvider = ({ children }) => {
  return <BookmarkProvider>{children}</BookmarkProvider>;
};

export default AuthenticatedProvider;
