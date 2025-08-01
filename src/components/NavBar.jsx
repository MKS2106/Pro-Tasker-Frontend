import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function NavBar() {
  const { user, logout } = useUser();

  return (
    <nav className="sticky top-0 z-50 flex justify-between border items-center bg-sky-100 px-6 py-3 rounded shadow mb-4">
      <div className="flex items-center gap-3">
        {/* Added conditional Welcome */}
        <img src="/bg.png" alt="project guru logo" className="w-8 h-8 rounded" />
        <h3 className="font-bold"> Welcome {user?.username}</h3>
      </div>
      <ul className=" flex space-x-4 font-medium text-blue-900">
         {user ? (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            {/* Added link for admin user */}
            {user.role === 'admin' && (
            <li>
              <NavLink to="/allusers">AllUsers</NavLink>
            </li>
            )}

            <li>
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
