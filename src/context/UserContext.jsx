import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { backendClient } from "../client/backendClient";

const UserContext = createContext({
    user: null
})

function UserProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("protasker-token"))
        console.log(token, "from userContext")
        if(token){
           backendClient.get("/projects", {
                      headers: {
                        Authorization: `Bearer ${JSON.parse(
                          localStorage.getItem("protasker-token")
                        )}`,
                          },
        }).then((res) => {setUser(res.data)})
        }
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

