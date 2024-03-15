// import React, { createContext, useContext, useState } from "react";

// // Step 1: Create a context
// const GlobalParamsContext = createContext();

// // Step 2: Create a provider component
// export const GlobalParamsProvider = ({ children }) => {
//   const [globalParams, setGlobalParams] = useState({
//     refreshTable: true,
//   });

//   return (
//     <GlobalParamsContext.Provider value={{ globalParams, setGlobalParams }}>
//       {children}
//     </GlobalParamsContext.Provider>
//   );
// };

// export const useGlobalParams = () => useContext(GlobalParamsContext);
