import {refreshToken} from '../core/apiCalls/user'

const tokenManger = () => {
    let inMemoryJWT = null

    const reloadAccessToken = () => {
        const delay = 1000 * 60 * 60
        setTimeout(() => {
            refreshToken()
            .then(data => setAccessToken(data.accessToken))
        }, delay)
    }

    const setAccessToken = (token) => {
        inMemoryJWT = token
        return true
    }

    const getAccessToken = () => inMemoryJWT

    const deleteAccessToken = () => {
        inMemoryJWT = null
        reloadAccessToken()
        return true
    }

    return {
        setAccessToken,
        getAccessToken,
        deleteAccessToken
    }
}

export default tokenManger()
