import * as React from 'react'

import { SignIn } from "./sign-in";
import { SignUp } from "./sign-up";

export function AuthPage(){

    const [isSignIn, setIsSignIn] = React.useState(true);

    React.useEffect(() => {
        localStorage.clear();
    }, [])

    return(
        <>
            {isSignIn ? (<SignIn changeStage={setIsSignIn}/>) : (<SignUp changeStage={setIsSignIn}/>)}
        </>
    )
}