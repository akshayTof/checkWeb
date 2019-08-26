module.exports = function filenameController(app, fileStoreSechma, apiResponse) {

    let fs = require('fs');
    let multer = require('multer');
    let util = require('util');

    const ipfsAPI = require('ipfs-http-client');
    const ipfs = ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'})

    //////////////////////////////////////////////
    ///       Function to add file to IPFS    ///
    ////////////////////////////////////////////

    function addFileToIPFS(filename, cb) {
        let FileToBeAdded = fs.readFileSync('./uploads/'+filename);
        console.log(FileToBeAdded, 'sssssss')
        let FileBuffer = new Buffer.from(FileToBeAdded);
        ipfs.add(FileBuffer, function (err, file) {
            if (err) {
                console.log(err);
            }
            console.log(file)
           // cb(file)
        })
    }

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            console.log(file)
            cb(null, file.fieldname + '-' + Date.now() + file.originalname)
        }
    })

    var upload = multer({
        storage: storage
    })


    app.post('/speech', upload.single('myfile'), async (req, res) => {
        try {
            //================
            const file = req.file
            console.log(file.filename)
            addFileToIPFS(file.filename )
            var filename = new fileStoreSechma();
            filename.fileName = 'req.body.aaa';
            filename.filenameText = req.body.filenameText;
            let insertData = await filename.save();
            res.write('received upload:\n\n');
            res.end(util.inspect({
                file: file
            }));
            return;
        } catch (e) {
            apiResponse.reportError(e)
            return res.status(500).json(apiResponse.sendReply(0, 'Copy website Error Occured'));
        }
    })

    app.get('/speech', (req, res) => {
        try {
            return res.render('../views/speech', {
                layout: false
            });
        } catch (e) {
            apiResponse.reportError(e)
            return res.status(500).json(apiResponse.sendReply(0, 'Copy website Error Occured'));
        }
    });
    return app;
}