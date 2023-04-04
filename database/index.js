const mongoose = require('mongoose');
const protocol = "mongodb+srv"
const url = "cluster0.gar8by0.mongodb.net"
const params = "?retryWrites=true&w=majority"
const username = "jimmy"
const password = "77HxXaPmjNUe85a"
const database = "Test-DB"

const connectionString = `${protocol}://${username}:${password}@${url}/${database}${params}`;

const options = {
    useNewUrlParser: true,
};

exports.connect = async () => {
    try {
        await mongoose.connect(connectionString, options)
        console.log(`Connection successful to ${database}:${url}`);
    }catch (e) {
        console.log(e)
    }
}