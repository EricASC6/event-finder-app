import { useContext } from "react";
import { BookmarkContext } from "../providers/BookmarkProvider";

export const useBookmark = () => useContext(BookmarkContext);
