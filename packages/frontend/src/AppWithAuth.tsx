/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react"
import { MuiThemeProvider, CssBaseline } from "@material-ui/core"
import { theme } from "./theme"
import { BrowserRouter } from "react-router-dom"
import Routes from "./route"
import useGlobalCSS from "./theme/GlobalCSS"
import Amplify, { Auth } from "aws-amplify"
import { AppBar, Typography, Toolbar } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from "@aws-amplify/ui-react"

Amplify.configure({
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,

        // REQUIRED - Amazon Cognito Region
        region: process.env.REACT_APP_COGNITO_REGION,

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: process.env.REACT_APP_COGNITO_IDENTITY_POOL_REGION,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.REACT_APP_COGNITO_USER_POOL_APP_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
    },
    API: {
        endpoints: [
            // API Gateway endpoint
            {
                name: process.env.REACT_APP_API_NAME,
                endpoint: process.env.REACT_APP_BASE_URL,
                region: process.env.REACT_APP_API_REGION,
                custom_header: async () => {
                    // REQUIRED - for hitting authorized API Gateway endpoints
                    return { Authorization: `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` }
                },
            },
        ],
    },
})

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})

const AppWithAuth: React.FC = () => {
    useGlobalCSS()
    const classes = useStyles()

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />

            {/* Authenticator takes care of the authenticated/non-authenticated states. <Routes/> and <AmplifySignOut /> get rendered only if user's authorized  */}
            <AmplifyAuthenticator
                usernameAlias="email"
                style={{
                    display: "flex",
                    height: "100%",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
            >
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            jkv2
            </Typography>

                        <AmplifySignOut />
                    </Toolbar>
                </AppBar>

                <AmplifySignIn usernameAlias="email" slot="sign-in" />
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
            </AmplifyAuthenticator>
        </MuiThemeProvider>
    )
}

export default AppWithAuth
