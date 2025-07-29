import { useState } from "react"
import { backendClient } from "../client/backendClient"
import { useNavigate } from "react-router-dom"

function LoginPage(){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const res = await backendClient.post('/users/login', formData)
            console.log(res.data)
            localStorage.setItem('protasker-token', JSON.stringify(res.data.token))
    
            navigate('/dashboard')
            
        } catch (error) {
            console.log(error)
        }
    
      }

    return(
        <main className="max-w-md mx-auto p-4">
            <h1 className="font-extrabold text-center text-2xl text-sky-400 mb-6" >Login page</h1>
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
                    palceholder = "password"
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