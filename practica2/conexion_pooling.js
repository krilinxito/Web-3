const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

console.time('Conexión con Pooling');

pool.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    console.log('Usuarios:', results);
    console.timeEnd('Conexión con Pooling'); 
});
