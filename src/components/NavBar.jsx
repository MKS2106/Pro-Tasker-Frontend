import { NavLink, Link} from "react-router-dom"

function NavBar(){
    return(
        <nav className="flex justify-between border items-center bg-sky-100 px-6 py-3 rounded shadow mb-4">
            <ul className=" flex space-x-4 font-medium text-blue-900">
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>
             </ul>             
            
        </nav>
    )
}
export default NavBar