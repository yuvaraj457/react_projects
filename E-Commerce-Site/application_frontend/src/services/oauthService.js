
import React from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'

import { googleSignup } from '../core/apiCalls/user'
import tokenManager from './authService'
import { useDispatch } from 'react-redux'
import { fetchUser, verifyAuth } from '../action/userAction'
import { fetchCartProducts } from '../action/cartAction'
import { useNavigate } from 'react-router-dom'

const clientId = '25981123335-h77gfe6icvuc9puchifc0s4qoalhpv6u.apps.googleusercontent.com'

export const GoogleOauthLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSuccess = (response) => {
        console.log(response);
        googleSignup(response.tokenId)
        .then(res => {
            dispatch(verifyAuth(true))
            tokenManager.setAccessToken(res.accessToken)
            dispatch(fetchUser())
            dispatch(fetchCartProducts())
            navigate('/')
        })
      }

    const onFailure = (response) => {
        console.log(response);
      }

  return (
    <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{width : '100%'}}
    // isSignedIn={true}
  />
  )
}

export const GoogleOauthLogout = () => {
    const responseGoogle = () => {
        console.log('logout')
      }
    return (
        <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={responseGoogle}
    ></GoogleLogout>
    )
}

// export const GoogleOauthLogin = () =>{
//     return ()
// }


