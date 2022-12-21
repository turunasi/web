import { Auth } from 'aws-amplify'

const signOut = async () => {
    try {
        await Auth.signOut()
    } catch (error) {
        console.log('error signing in', error)
    }
}

export const SignOutButton = () => {
    return (
        <button onClick={signOut}>Sign Out</button>
    )
}