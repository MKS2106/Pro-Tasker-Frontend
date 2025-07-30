import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function NavBar() {

  /** 
   * const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("protasker-token");
    setIsLoggedIn(token ? true : false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('protasker-token')
    setIsLoggedIn(false)
    navigate('/login')
  } 
   * 
   * 
  */
 const { user, logout } = useUser()
  
  return (
    <nav className="flex justify-between border items-center bg-sky-100 px-6 py-3 rounded shadow mb-4">
      <div>
          {/* Added conditonal Welcome */}
            <p> Welcome {user?.username}</p>
          </div>
      <ul className=" flex space-x-4 font-medium text-blue-900">
        {/* {isLoggedIn ? ( */}
          {user? (
               <>
          
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              {/* <h3>dashboard - coming soon</h3> */}
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
                <button onClick={logout}>Logout</button>
            </li>
          </>
          
        ) : (      

            <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </>



        )}
      </ul>
    </nav>
  );
}
export default NavBar;
