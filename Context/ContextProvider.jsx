import React, { useState } from "react";
import Context from "./Context";

const ContextProvider = (props) => {
  const [isLogged, setIsLogged] = useState(false);
  const [favs, setFavs] = useState([]);

  const setIsLoggedFn = (data) => {
    setIsLogged(data);
  };

  const setFavsFn = (data) => {
    setFavs(data);
  };

  const ContextData = {
    isLogged: isLogged,
    setIsLogged: setIsLoggedFn,
    favs: favs,
    setFavs: setFavsFn,
  };

  return (
    <Context.Provider value={ContextData}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
