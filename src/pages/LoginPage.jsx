import { useState } from "react"
import { backendClient } from "../client/backendClient"
import { useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext";

function LoginPage(){
    const [error, setError] = useState("")
    const {setUser} = useUser();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setError("")
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //access endpoint /api/users/login
            const res = await backendClient.post('/users/login', formData)
            console.log(res.data) //Debugging 
            localStorage.setItem('protasker-token', JSON.stringify(res.data.token)) //Set the local storage with the key:protasker-token with the token from json response
            
            setUser(res.data.user)//set the user with the response data
            navigate('/dashboard')//upon successfull login navigate user to the dashboard
            
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Login Failed. Please try again"
            setError(errorMessage)
        }
    
      }

    return(
        <main className="max-w-md mx-auto p-4">
            <h1 className="font-extrabold text-center text-2xl text-sky-400 mb-6" >Login page</h1>

            {/* Adding Error message - handling error from server side */}
            {error && (<p className="text-red-600 font-semibold mb-4 text-center">{error}</p>)}

            <form className= "flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"/>
                    <input className="border rounded px-3 py-2 w-full "
                     type = "email"
                     name="email"
                     placeholder="Email"
                     value={formData.email}
                     onChange={handleChange}
                     required
                     />
                </div>
                <div>
                    {/* <label htmlFor="password"/> */}
                    <input className="border rounded px-3 py-2 w-full"
                    type = "password"
                    name = "password"
                    palceholder = "Password"
                    value = {formData.password}
                    onChange={handleChange}
                    required
                    />
                </div>

                <input className="border bg-sky-100 rounded p-1 font-bold text-blue-800" type="submit" value="Login" />
            </form>
        </main>
    )
}

export default LoginPage