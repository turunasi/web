import { useState } from 'react'
import { SignInForm } from './features/cognito/components/SignInForm'
import { SignUpForm } from './features/cognito/components/SignUpForm'
import { SignOutButton } from './features/cognito/components/SignOutButton'
import { Amplify } from 'aws-amplify'
import { AmplifyConfig } from './logic/aws/cognito'
import loginImage from './assets/login.png'
import logoutImage from './assets/logout.png'
import './App.css'

Amplify.configure(AmplifyConfig)

function App() {
    const [isLoggedIn, changeLogin] = useState(false)
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleValues = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...formValues, [name]: event.target.value }
        setFormValues(newValues)
    }

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
            <div className="flex justify-evenly">
                <div className="card">
                    <SignUpForm />
                </div>
                <div className="card">
                    <SignInForm />
                </div>
                <div className="card">
                    <SignOutButton />
                </div>
            </div>
        </div>
    )
}

export default App
