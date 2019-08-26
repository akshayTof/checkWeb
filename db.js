let mongoose = require('mongoose');
let localConfig = require('./config').localConfig;

module.exports = (callback => {
    let db = mongoose.connect(localConfig.mongoUrl, { useNewUrlParser: true });
    callback(db);
    let mydb = mongoose.connection;
    mydb.once('open', (data) => {
        console.log('connected');
    })
    mydb.on('error', console.error.bind(console, 'Error with Mongo connection'));
});