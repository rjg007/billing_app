import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Register1 from './components/Register1'


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
      <Header />

      <NavBar toggleLogin={toggleLogin} handleAuth={handleAuth} />

      <Register1 />
      
    </div>
  )
}

export default App