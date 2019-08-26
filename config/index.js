module.exports.localConfig = {
    "host": "",
    "user": "",
    "password": "",
    "database": "",
    "connectionLimit": 100,
    dialect: 'sqlite' || 'mysql' || 'postgres',
    "mongoUrl": "mongodb://localhost:27017/porter"

}
module.exports.appConstants = {    
    "bodyLimit": "50 mb",
    "port": process.env.PROCESS_PORT 
}
module.exports.secretKeys = {
    "secret": process.env.SECRET_KEY
}
