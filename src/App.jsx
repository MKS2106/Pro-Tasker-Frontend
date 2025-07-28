import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import RegistrationPage from './pages/RegistrationPage'
import NavBar from './components/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1 className='font-bold'> ProTasker- A Project Management App</h1>
     <NavBar/>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/register' element={<RegistrationPage/>} />
      </Routes>
    </>
  )
}

export default App
