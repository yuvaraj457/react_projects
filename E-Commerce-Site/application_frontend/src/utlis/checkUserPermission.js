
export const checkuserpermission = (userType, path) => {
    const allowAccess = {
        '/login' : ['*'],
        '/home' : ['*'],
        '/signup' : ['*'],
        '/cart' : ['user', 'superuser', 'admin'],
        '/checkout' : ['user', 'superuser', 'admin'],
        '/payment' : ['user', 'superuser', 'admin'],
        '/MyAccount' : ['user', 'superuser', 'admin'],
        '/editProfile/phone' : ['user', 'superuser', 'admin'],
        '/editProfile/activeAddress' : ['user', 'superuser', 'admin'],
        '/Product%20Upload' : ['superuser', 'admin'],
        '/Product%20Edit' : ['superuser', 'admin'],
        '/Manage%20Users' : ['admin']
    }

    if(!(path in allowAccess)){
        return false
    }

    if(allowAccess[path].includes(userType) || allowAccess[path].includes('*')){
        return true
    }

    return false
}