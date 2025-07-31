import { useState } from "react";
import { backendClient } from "../client/backendClient";
import { useNavigate } from "react-router-dom"

// import { useUser } from "../context/UserContext";

function RegistrationPage(){
  const [error, setError] = useState("")
  const navigate = useNavigate();
        
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

const handleChange = (e) => {
    setError("") //Added for error handling
    setFormData({
        ...formData, [e.target.name]: e.target.value
    })
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

    //     if (formData.password.length < 5) {
    //   alert("Password must be at least 5 characters");
    //   return;
    // }
        const res = await backendClient.post('/users/register', formData)
        console.log(res.data)
        localStorage.setItem('protasker-token', JSON.stringify(res.data.token))
        setError("");
        navigate('/login')

    } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Rgistration Failed. Please try again"
            // const errorMessage = error.response?.data?.message 
            console.log(errorMessage)
            setError(error.response.data.errors) // added to display the error message which is set in the Schema
        }

  };
    return(
        <main className="max-w-md mx-auto p-4">
      <h1 className="font-extrabold text-center text-2xl text-sky-400 mb-6">Registration Page</h1>

      {error && (<p className="text-red-600 font-semibold mb-4 text-center">{error}</p>)}
    
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