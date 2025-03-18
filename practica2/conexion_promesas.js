const mysql = require('mysql2/promise');

async function conectarMySQL() {
    console.time('Conexión con Promesas');

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'testdb'
        });

        console.log('Conectado a MySQL');

        const [rows] = await connection.execute('SELECT * FROM users');
        console.log('Usuarios:', rows);

        await connection.end();
        console.timeEnd('Conexión con Promesas'); 

    } catch (err) {
        console.error('Error:', err);
    }
}

conectarMySQL();
