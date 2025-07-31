import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import LoginPage from './pages/LoginPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import { useUser} from './context/UserContext'
import AdminUser from './pages/AdminUser'

function App() {
  const { user } = useUser()

  return (
    <div
      className="min-h-screen flex flex-col text-blue-900"
      style={{
        backgroundImage: "url('/appBg.png')", // Make sure bg.png is in /public
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
     
     
     {/* <h1 className='font-bold'> Project Guru - A Project Management App</h1> */}
     <NavBar/>
    <main className="flex-grow">
      {!user? (
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegistrationPage/>} />
        <Route path='/login' element={<LoginPage/>} />
               
      </Routes>
      ): (
        <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegistrationPage/>} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/dashboard' element={<ProjectsPage/>}/>
        <Route path='/projects/:projectId' element={<ProjectDetailPage/>}/>

        {/* Added route for admin user */}
        <Route path='/allusers' element={<AdminUser/>}/>
        
      </Routes>
      )}
      </main>      
      <Footer/>
    </div>
  )
}

export default App
