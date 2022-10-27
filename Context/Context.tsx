import { createContext } from "react";

const Context = createContext({
    isLogged: false,
    setIsLogged: null,
    favs: [],
    setFavs: null,
});

export default Context;
