const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb+srv://one-week-user-starts-2021-11-30:njJcxLRn1xzudixp@bbdb-cluster.yvexm.mongodb.net';
let db            = null;
 
// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('bbdb-cluster');
});

// create user account
function createAccount(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('customers');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function findAccount(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('customers')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('customers')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function updateBalance(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('customers')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function findAllAccounts(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('customers')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


// /**
//  * Return an array of users in the database
//  * @returns {Promise} An array wrapped in an promise
//  */
// function getAllUsersAsArray(){
//     return fetch("http://localhost:5000/account/all")
//       .then(response => response.json())
// }

module.exports = {createAccount, findOne, findAccount,updateBalance, findAllAccounts};
