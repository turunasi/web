import { useState } from 'react'
import { Auth } from 'aws-amplify'

export const SignInForm = () => {
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleValues = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...formValues, [name]: event.target.value }
        setFormValues(newValues)
    }

    const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const user = await Auth.signIn(formValues.email, formValues.password)
            console.log('signed in successfully', user)
        } catch (error) {
            console.log('error signing in', error)
        }
    }

    return (
        <form onSubmit={signIn} action="">
            <input
                className="my-2"
                type="username"
                name="username"
                placeholder="John Doe"
                value={formValues.username}
                onChange={handleValues('username')}
            />
            <input
                className="my-2"
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleValues('email')}
            />
            <input
                className="my-2"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleValues('password')}
            />
            <div>
                <button className="hover:bg-white">Sign In</button>
            </div>
        </form>
    )
}
