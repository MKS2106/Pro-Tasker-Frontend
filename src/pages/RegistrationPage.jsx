import { useState } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom"

function RegistrationPage(){

  const navigate = useNavigate();
        
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

const handleChange = (e) => {
    setFormData({
        ...formData, [e.target.name]: e.target.value
    })
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await backendClient.post('/users/register', formData)
        console.log(res.data)
        localStorage.setItem('protasker-token', JSON.stringify(res.data.token))

        navigate('/login')

    } catch (error) {
        console.log(error)
    }

  };
    return(
        <main className="max-w-md mx-auto p-4">
      <h1 className="font-extrabold text-center text-2xl text-sky-400 mb-6">Register Page</h1>
    
      <form className= "flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>        
        <label htmlFor="username" />
        <input className="border rounded px-3 py-2 w-full "
          type="text"
          name="username"
          placeholder="User Name"
          value={formData.username}
          onChange={handleChange}
          required
        />
        </div>

        <div>
          <label htmlFor="email" />
          <input className="border rounded px-3 py-2 w-full "
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>
        
        <div>
           <label htmlFor="password" />
           <input className="border rounded px-3 py-2 w-full "
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        </div>
       

        <input className="border bg-sky-100 font-bold rounded p-1 text-blue-800" type="submit" value="Register" />
      </form>
    </main>
    )
}

export default RegistrationPage;