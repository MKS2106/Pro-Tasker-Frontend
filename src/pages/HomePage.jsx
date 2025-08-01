import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

function HomePage(){

  const { user, logout } = useUser();
    return(

      <main className="w-full px-6 pt-12 pb-24 text-blue-900 max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-8 text-center">Project Guru</h1>
      
      <p className="text-xl mb-6">
        Welcome to <strong>Project Guru</strong> — your all-in-one solution for managing, tracking, and succeeding with your projects.
      </p>
      
      <p className="text-lg leading-relaxed">
        Our Goal is to empower teams and individuals by providing a comprehensive project management platform
        that’s easy to use, highly customizable, and packed with features. From task tracking to collaboration,
        Project Guru helps you stay organized and focused on what matters most.
      </p>
      {/* Display the link GetStarted only if user is not logged in */}
      <div className="text-center"> {!user ? (<><Link to="/register" className="mt-56 inline-block bg-blue-400 font-semibold py-3 px-6 rounded ">Get Started - Register Now</Link></>) : 
      <h2 className="mt-2 font-bold text-xl">Hello Again!! </h2>}
        
      </div>
       </main>

    )
}

export default HomePage;
