import "./constants";
import {
    COGNITO_IDENTITY_POOL_ID,
    COGNITO_REGION,
    USER_POOL_CLIENT_ID,
    USER_POOL_ID
} from "./constants";
import { Amplify, Auth } from 'aws-amplify';
// import { Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';

Amplify.configure({
    Auth: {
        identityPoolId: COGNITO_IDENTITY_POOL_ID,
        region: COGNITO_REGION,
        identityPoolRegion: COGNITO_REGION,
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: USER_POOL_CLIENT_ID
    },
});


const signUp = async(username:string, password:string) => {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            autoSignIn: { // optional - enables auto sign in after user is confirmed
                enabled: true,
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

const signIn = async() => {
    try {
        const user = await Auth.signIn('user', 'Dsuxjc85&');
        console.log('signed in successfully', user);
    } catch (error) {
        console.log('error signing in', error);
    }
}

const signOut = async() => {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing in', error);
    }
}

export default signIn;
