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

function App() {
  const { user } = useUser()

  return (
    <>
     <h1 className='font-bold'> ProTasker- A Project Management App</h1>
     <NavBar/>

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
        
      </Routes>
      )}
      
      <Footer/>
    </>
  )
}

export default App
