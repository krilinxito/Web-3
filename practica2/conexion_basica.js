const mysql = require('mysql2');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
        rl.close();
        return;
    }

    console.log('Conectado a MySQL');

    connection.query('SELECT * FROM usuarios1', (err, resultadosAntes) => {
        if (err) throw err;

        console.log(resultadosAntes);

        rl.question('\nID: ', (id) => {
            rl.question('Nuevo nombre: ', (nombre) => {
                const sql = 'UPDATE usuarios1 SET nombre = ? WHERE id = ?';
                connection.query(sql, [nombre, id], (err) => {
                    if (err) {
                        console.error('Error al actualizar:', err);
                        rl.close();
                        connection.end();
                        return;
                    }

                    console.log('\nbuenaaa\n');

                    connection.query('SELECT * FROM usuarios1', (err, resultadosDespues) => {
                        if (err) throw err;

                        console.log(resultadosDespues);

                        connection.end();
                        rl.close();
                        console.timeEnd('Conexión Básica');
                    });
                });
            });
        });
    });
});
