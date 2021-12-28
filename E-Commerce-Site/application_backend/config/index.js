require('dotenv').config()
const mongoose = require('mongoose')

const dbConfig = () => mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log('Database Connected'))
    .catch((error) => console.log(error))

module.exports = {dbConfig}