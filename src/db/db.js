const mongoose = require('mongoose');



function connect() {
    mongoose.connect('mongodb://localhost:27017/node-project-auth')
    .then(() => {
        console.log('connected to MongoDB');
    })

    .catch(err => {
        console.log('Error connecting to MongoDB');
        console.log(err);

    })
}


module.exports = connect;