
import React from 'react'
import GoogleLogin, { GoogleLogout } from 'react-google-login'

const clientId = '25981123335-h77gfe6icvuc9puchifc0s4qoalhpv6u.apps.googleusercontent.com'

export const GoogleOauthLogin = () => {

    const onSuccess = (response) => {
        console.log(response.profileObj);
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
    isSignedIn={true}
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


