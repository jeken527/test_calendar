import { createContext, useContext } from "react";

export const OverlayContext = createContext(true);

export const useOverlayContext = () => {
  return useContext(OverlayContext);
};
