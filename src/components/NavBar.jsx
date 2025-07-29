import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  return (
    <nav className="flex justify-between border items-center bg-sky-100 px-6 py-3 rounded shadow mb-4">
      <ul className=" flex space-x-4 font-medium text-blue-900">
        {isLoggedIn ? (
               <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <h3>dashboard - coming soon</h3>
            </li>
            <li>
                <button onClick={handleLogout}>Logout</button>
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
