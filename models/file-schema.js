const mongoose = require('mongoose');
const Schema = mongoose.Schema


const fileStoreSchema = new Schema({
    fileName: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


const contracts = mongoose.model('fileStore', fileStoreSchema)

module.exports = contracts