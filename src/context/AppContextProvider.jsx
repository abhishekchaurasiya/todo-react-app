import { createContext, useState } from "react";


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({})


    const value = {
        loading, setLoading,
        isAuthenticated, setIsAuthenticated,
        user, setUser
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

