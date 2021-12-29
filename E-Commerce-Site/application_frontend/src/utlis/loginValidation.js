export const loginValidation = (formData) => {
    const {email, password} = formData
    const errorList = {}
    errorList.isValid = false
    if (!email) {
        errorList.email = 'Email Required';
    }
    if(!password){
        errorList.password = 'Password Required'
    }

    if(!errorList.email && !errorList.password){
        errorList.isValid = true
    }

    return errorList

}