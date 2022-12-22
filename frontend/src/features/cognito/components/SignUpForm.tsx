import { useState } from 'react'
import { Auth, Hub } from 'aws-amplify'

export const SignUpForm = () => {
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isResendFormShown, showResendForm] = useState(false)
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        code: ''
    })

    const handleValues = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValues = { ...formValues, [name]: event.target.value }
        setFormValues(newValues)
    }

    const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const user = await Auth.signUp({
                username: formValues.email,
                password: formValues.password,
                attributes: {
                    email: formValues.email
                }
                // autoSignIn: {
                //     enabled: true
                // }
            })
            console.log(user)
            setErrorMessage('')
            setMessage('Created user successfully!')
            showResendForm(true)
        } catch (error: any) {
            console.log('error signing up:', error)
            setMessage('')
            setErrorMessage(error.message)
        }
    }

    const confirmSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await Auth.confirmSignUp(formValues.email, formValues.code)
            setMessage('Confirmed code successfully!')
        } catch (error: any) {
            console.log('error code: ', error)
            setErrorMessage(error.message)
            showResendForm(false)
        }
    }

    return (
        <>
            {errorMessage ? <p className="underline decoration-red-600">{errorMessage}</p> : null}
            {message ? <p className="underline decoration-green-600">{message}</p> : null}
            <form onSubmit={signUp} action="" className="flex flex-col">
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
                    <button className="bg-orange-500 hover:bg-orange-600">Sign Up</button>
                </div>
            </form>
            {isResendFormShown ? (
                <form onSubmit={confirmSignUp} action="" className="flex flex-col">
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
                        type="text"
                        name="code"
                        placeholder="code"
                        value={formValues.code}
                        onChange={handleValues('code')}
                    />
                    <div>
                        <button className="hover:bg-white">Confirm Code</button>
                    </div>
                </form>
            ) : null}
        </>
    )
}
