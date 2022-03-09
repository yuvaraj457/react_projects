import {refreshToken} from '../core/apiCalls/user'

const tokenManager = () => {
    let inMemoryJWT = null

    const reloadAccessToken = () => {
        const delay = 1000 * 60 * 8
        setTimeout(() => {
            refreshToken()
            .then(data => setAccessToken(data.accessToken))
        }, delay)
    }

    const setAccessToken = (token) => {
        inMemoryJWT = token
        reloadAccessToken()
        return true
    }

    const getAccessToken = () => inMemoryJWT

    const deleteAccessToken = () => {
        inMemoryJWT = null
        return true
    }

    return {
        setAccessToken,
        getAccessToken,
        deleteAccessToken
    }
}

export default tokenManager()
