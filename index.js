let express = require('express');
let app = express();
let appConstants = require('./config').appConstants;
let path = require('path');
//--------------------------------------------------------------------
// Body parser middleware
app.use(express.json({
    limit: appConstants.bodyLimit
}));
app.use(express.urlencoded({
    extended: true
}));

const exphbs = require('express-handlebars'); 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname,'views'))



// Define Utils
let apiResponse = require('./utils/response');
let initdb = require('./db');

app.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
});

// Define models
let fileStoreSechma = require('./models/file-schema');
// Define App Routes
let speechCopy = require('./controller/speech-copy-controller');

initdb(db => {
    speechCopy(app, fileStoreSechma, apiResponse);
})
// Start application
app.all('*', (req, res) => {
    return res.status(500).send(apiResponse.sendReply(0, 'Add edit contract Error Occured'));
});

let PORT = 3015 || process.env.PORT;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console 
    console.log(`Connection established on Port: ${PORT}`);
});