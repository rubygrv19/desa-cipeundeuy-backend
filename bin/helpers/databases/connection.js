require('dotenv').config();
const mysql = require('mysql');

const connection = mysql.createConnection({
    // DB db4free.net
    // host: 'db4free.net',
    // port: '3306',
    // user: 'rubygrv',
    // password: 'Q089653204923q',
    // database:'rubygrvdb'

    // DB local
    // host: 'localhost',
    // user: 'root',
    // password: '',
    // database:'desacipeundeuydb'

    // DB Hosting
    host: 'srv143.niagahoster.com',
    port: '3306',
    user: 'u1652720_kkndesacipeundeuy_root',
    password: 'kkndesacipeundeuy2022',
    database:'u1652720_desacipeundeuydb'
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`Database Connected to Server!`);
});

module.exports = connection;
