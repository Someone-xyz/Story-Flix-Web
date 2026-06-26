const mongoose = require('mongoose');

async function connectDB(){
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connected on host ${conn.connection.host} name : ${conn.connection.name}`);
    } catch (err) {
        console.log(`Error While connecting DB 
            Error : ${err.message}   ${err}`)
        process.exit(1);
    } 
}

module.exports = connectDB;