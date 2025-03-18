const mysql = require('mysql2');

console.time('Conexión Básica');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

connection.connect(err => {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }

    console.log('Conectado a MySQL');

    connection.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        console.log('Usuarios:', results);

        connection.end();
        console.timeEnd('Conexión Básica'); 
    });
});
