import React, {useState, useEffect} from 'react'
import Header from './components/Header'
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
      <Header />

      <NavBar toggleLogin={toggleLogin} handleAuth={handleAuth} />
      
    </div>
  )
}

export default App