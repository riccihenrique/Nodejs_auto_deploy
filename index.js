const express = require('express')();
const bodyParser = require('body-parser');
const { processArgs, autoDeploy } = require('./src/autoDeploy.js');
const cors = require('cors');

express.use(bodyParser.json());
express.use(cors());
if(process.argv.length <= 2) {
    express.use('/:path', (req, res) => {
        const config  = { ...req.body };
        config.path = req.params.path;
        try {
            autoDeploy(config);
            res.status(200).send('Ok.');
        }
        catch (err) {
            console.error(err.message);
            res.status(500).json({
                error: err.message,
            });
        }
    });

    express.listen(6643, _ => {
        console.log('Running at 6643');
    }).on('error', console.log);
}

module.exports = processArgs;

if(!module.parent && process.argv.length > 2) {
    processArgs();
}