import { useState } from 'react'
import loginImage from './assets/login.png'
import logoutImage from './assets/logout.png'
import './App.css'

function App() {
    const [isLoggedIn, changeLogin] = useState(false)

    return (
        <div className="App">
            <div className="flex justify-center">
                {isLoggedIn ? (
                    <img src={loginImage} alt="login" />
                ) : (
                    <img src={logoutImage} alt="logout" />
                )}
            </div>
            <h1>Vite + React + TS + TailwindCSS</h1>
            <div className="card">
                <button onClick={() => changeLogin((isLoggedIn) => !isLoggedIn)}>
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default App
