import '../../constants'
import {
    COGNITO_IDENTITY_POOL_ID,
    COGNITO_IDENTITY_POOL_REGION,
    COGNITO_REGION,
    USER_POOL_CLIENT_ID,
    USER_POOL_ID
} from '../../constants'

export const AmplifyConfig = {
    Auth: {
        identityPoolId: COGNITO_IDENTITY_POOL_ID,
        region: COGNITO_REGION,
        identityPoolRegion: COGNITO_IDENTITY_POOL_REGION,
        userPoolId: USER_POOL_ID,
        userPoolWebClientId: USER_POOL_CLIENT_ID
    }
}
