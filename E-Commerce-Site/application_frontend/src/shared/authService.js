
const tokenManger = () => {
    let inMemoryJWT = null

    const setAccessToken = (token) => {
        inMemoryJWT = token
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

export default tokenManger()
