import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Login1 from './components/Login1'
import Drawer from './components/controls/Drawer'

const App = (props) => {

  const [toggleLogin, setToggleLogin] = useState(false)

  const handleAuth = () => {
    setToggleLogin(!toggleLogin)
  }

  useEffect(() => {
    if(localStorage.getItem('token')) {
      handleAuth()
    }
  }, [])

  return (
    <div>
      {/* <Header /> */}
      {/* <Drawer toggleLogin={toggleLogin} handleAuth={handleAuth} /> */}
      {/* <Drawer1 /> */}
      <NavBar toggleLogin={toggleLogin} handleAuth={handleAuth}/> 
      {/* <Login1 />      */}
    </div>
  )
}

export default App