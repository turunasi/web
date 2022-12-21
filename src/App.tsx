import { useState } from 'react'
import "./constants";
import {
    COGNITO_IDENTITY_POOL_ID,
    COGNITO_REGION,
    USER_POOL_CLIENT_ID,
    USER_POOL_ID
} from "./constants";
import signIn from './login'
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
                <button onClick={signIn}>
                    {isLoggedIn ? 'Logout' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default App
