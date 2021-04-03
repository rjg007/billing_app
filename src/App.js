import React, {useState, useEffect} from 'react'
import NavBar from './components/NavBar'


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
      {/* <Drawer toggleLogin={toggleLogin} handleAuth={handleAuth} /> */}
      {/* <Drawer1 /> */}
      <NavBar toggleLogin={toggleLogin} handleAuth={handleAuth}/> 
      {/* <Login1 />      */}
    </div>
  )
}

export default App