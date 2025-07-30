import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
    user: null
})

function UserProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const logout = () => {
        localStorage.removeItem('protasker-token')
    // setIsLoggedIn(false)
    setUser(null)
    navigate('/login')
    }

    const values = { user, setUser, loading, setLoading, logout}
    return(
        <UserContext.Provider value = {values}>{children}</UserContext.Provider>
    )

}

export const useUser = () => {
    const context = useContext(UserContext)
    return context
}

export default UserProvider

