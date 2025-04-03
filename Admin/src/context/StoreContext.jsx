import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [canteenToken, setCanteenToken] = useState(() => localStorage.getItem("canteenToken") || "");
  const [canteenName,setCanteenName] = useState("");
  

  const contextValue = { canteenToken, setCanteenToken,canteenName,setCanteenName };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;