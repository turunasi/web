import { useState } from 'react'
import { Auth, Hub } from 'aws-amplify'

export const SignUpForm = () => {
    const [message, setMessage] = useState('')
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

    // Hub.listen('auth', ({ payload }) => {
    //     const { event } = payload;
    //     if (event === 'autoSignIn') {
    //         const user = payload.data;
    //         console.log(user)
    //     } else if (event === 'autoSignIn_failure') {
    //         // redirect to sign in page
    //     }
    // })

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
            setMessage('User created successfully!')
            showResendForm(true)
        } catch (error) {
            console.log('error signing up:', error)
        }
    }

    const confirmSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            await Auth.confirmSignUp(formValues.email, formValues.code)
            setMessage('Confirmation code resent successfully!')
        } catch (error) {
            console.log('error resending code: ', error)
            showResendForm(false)
        }
    }

    return (
        <>
            <form onSubmit={signUp} action="">
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
                    <button className="hover:bg-white">Sign Up</button>
                </div>
            </form>
            {isResendFormShown ? (
                <form onSubmit={confirmSignUp} action="">
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
                        type="code"
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
