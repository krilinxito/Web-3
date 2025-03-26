const mysql = require('mysql2/promise');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function preguntar(pregunta) {
    return new Promise(resolve => rl.question(pregunta, resolve));
}

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

        const [antes] = await connection.execute('SELECT * FROM usuarios3');
        console.log(antes);

        const id = await preguntar('\nID: ');
        const nuevoNombre = await preguntar('Nuevo nombre: ');

        await connection.execute('UPDATE usuarios3 SET nombre = ? WHERE id = ?', [nuevoNombre, id]);
        console.log('\nbuenaaa\n');

        const [despues] = await connection.execute('SELECT * FROM usuarios3');
        console.log(despues);

        await connection.end();
        rl.close();
        console.timeEnd('Conexión con Promesas');

    } catch (err) {
        console.error('Error:', err);
        rl.close();
    }
}

conectarMySQL();
