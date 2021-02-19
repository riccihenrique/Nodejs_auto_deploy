const express = require('express')();
const autodeploy = require('./autoDeploy.js');

express.use('/', (req, res) =>{
    autodeploy();
    console.log('Deploy was successful!!');
    res.status(200).send('Ok.');
});

express.listen(6643, _ => {
    console.log('Running at 6643');
});