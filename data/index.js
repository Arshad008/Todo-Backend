const mongoose = require('mongoose');
const { databaseConfig } = require('../appConfig');

module.exports = {
    initDatabase:()=>{
        mongoose.connect(databaseConfig.url, {useNewUrlParser: true})
        .then(()=>console.log("- Database Connection Successfully Established"))
        .catch(err=>{
            console.error("- An error occured while Connecting to the Database");
            console.error(err);
        });
    }
}