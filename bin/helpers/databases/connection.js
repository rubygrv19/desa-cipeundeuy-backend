require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'db4free.net',
    port: '3306',
    user: 'rubygrv',
    password: 'Q089653204923q',
    database:'rubygrvdb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Database Connected to Server!`);
});

module.exports = connection;
