const bcrypt = require('bcrypt')
const userDetailsModel = require('../../models/userModel')

const signup = (req, res) => {
    const {email, firstName, lastName, password} = req.body
    try{
        bcrypt.hash(password, 10)
        .then(async(hashed) => {
            const data = await userDetailsModel({
                firstName,
                lastName,
                email,
                password : hashed
            })
            data.save()
        })
        .then(() => res.status(201).send('Successfully registered.'))
        .catch(error => console.log(error))
    }
    catch(error){

    }
}

module.exports = {signup}