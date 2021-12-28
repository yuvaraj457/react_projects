
export const signupValidation = (formData) => {
    const {firstName, lastName, email, password, confirmPassword} = formData;
    const errorList = {};

    const isStrongPassword = false

    if (!firstName) {
        errorList.firstName = 'firstName should not be blank';
    }
    else if (!(/^[a-zA-Z]+$/.test(firstName))) {
        errorList.firstName = 'Special charcters and spaces not allowed';
    }

    if (!lastName) {
        errorList.lastName = 'lastName should not be blank';
    }
    else if (!(/^[a-zA-Z]+$/.test(lastName))) {
        errorList.lastName = 'Special charcters and spaces not allowed';
    }

    if (!email) {
        errorList.email = 'Email should not be blank';
    }
    else if (!(/\S+@\S+\.\S+/.test(email))) {
        errorList.email = 'Invalid email';
    }

    let regweek = /[a-z A-z]/
    let regmedium = /\d+/
    let regstrong = /.[!,@,#,$,%,^,&,*,(,),_.+]/
    let no = 1;
    
    if (password) {
        if (password.length <= 5 && ((regweek.test(password)) || (regmedium.test(password)) || (regstrong.test(password)))) {
            no = 1;
        }
        if (password.length >= 6 && (
            (regweek.test(password) && regmedium.test(password)) || (regstrong.test(password) && regmedium.test(password)) ||
            (regweek.test(password) && regstrong.test(password))
        )) {
            no = 2;
        }
        if (password.length >= 6 && (regweek.test(password)) && (regmedium.test(password)) && (regstrong.test(password))) {
            no = 3;
        }


        if (no === 1) {
            errorList.password = 'Password is weak (password should be greater than 6 alpha numberic charcters with special chracters)'
        }

        else if (no === 2) {
            errorList.password = 'Password is medium (password should be greater than 6 alpha numberic charcters with special chracters)'
        }

        else if (no === 3) {
            errorList.password = 'Password is strong'
            isStrongPassword = true
        }
    }
    else {
        errorList.password = 'Password required'
    }


    if (password === confirmPassword && isStrongPassword) {
        errorList.confirmPassword = 'Password Matched'
    }

    else if (password !== confirmPassword && isStrongPassword) {
        errorList.confirmPassword = 'Password Mismatch';
    }

    else {
        errorList.confirmPassword = 'Valid password required';
    }

    return errorList;
}