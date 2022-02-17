
export const checkuserpermission = (userType, path) => {
    const allowAccess = {
        '/login' : ['*'],
        '/home' : ['*'],
        '/signup' : ['*'],
        '/productDetails/:productId' : ['*'],
        '/productType/:field' : ['*'],
        '/cart' : ['user', 'superuser', 'admin'],
        '/checkout' : ['user', 'superuser', 'admin'],
        '/payment' : ['user', 'superuser', 'admin'],
        '/MyAccount' : ['user', 'superuser', 'admin'],
        '/editProfile/:field' : ['user', 'superuser', 'admin'],
        '/Product%20Upload' : ['superuser', 'admin'],
        '/product%20Edit' : ['superuser', 'admin'],
        '/Manage%20Users' : ['admin']
    }
    // const routes = Object.keys(allowAccess)

    if(!(path in allowAccess)){
        return false
    }

    if(allowAccess[path].includes(userType) || allowAccess[path].includes('*')){
        return true
    }

    return false
}