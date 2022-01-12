const bcrypt = require('bcrypt')
const userDetailsModel = require('../../models/userModel')

const signup = (req, res) => {
    try{
        const {email, firstName, lastName, password, phone} = req.body
        bcrypt.hash(password, 10)
        .then(async(hashed) => {
            const data = await userDetailsModel({
                firstName,
                lastName,
                email,
                phone,
                password : hashed
            })
            data.save()
        })
        .then(() => res.status(201).send('Successfully registered.'))
        .catch(error => console.log(error))
    }
    catch(error){
        console.log(error)
    }
}

module.exports = {signup}