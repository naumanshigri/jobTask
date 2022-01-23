const mongoose = require("mongoose");
const { MongoURI } = require("../config/config");

const dbConnection = async () => {
    return new Promise(async (resolve, reject) => {
        try {
             mongoose.connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology:true }, async (err, db)=>{
                  if(err) return reject('Database not found')
                  return resolve(db)
              }) 

        } catch (e) {
            console.log('error in connection', e)
            return reject(e)
        }
    })
}

module.exports = { dbConnection }