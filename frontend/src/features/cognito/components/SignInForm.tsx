import { useState } from 'react'
import { Auth } from 'aws-amplify'

export const SignInForm = () => {
    const [formValues, setFormValues] = useState({
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
        <form onSubmit={signIn} action="" className="flex flex-col">
            <input
                className="my-2 rounded-lg text-slate-700"
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleValues('email')}
            />
            <input
                className="my-2 rounded-lg text-slate-700"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleValues('password')}
            />
            <div>
                <button className="bg-green-500 hover:bg-green-600">Sign In</button>
            </div>
        </form>
    )
}
