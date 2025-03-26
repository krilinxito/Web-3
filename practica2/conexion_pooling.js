const mysql = require('mysql2');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

pool.query('SELECT * FROM usuarios2', (err, resultadosAntes) => {
    if (err) {
        console.error('Error al consultar antes del update:', err);
        rl.close();
        return;
    }

    console.log(resultadosAntes);

    rl.question('\nID: ', (id) => {
        rl.question('Nuevo nombre: ', (nombre) => {
            const updateQuery = 'UPDATE usuarios2 SET nombre = ? WHERE id = ?';
            pool.query(updateQuery, [nombre, id], (err) => {
                if (err) {
                    console.error('Error al actualizar:', err);
                    rl.close();
                    return;
                }

                console.log('\nbuenaa\n');

                pool.query('SELECT * FROM usuarios2', (err, resultadosDespues) => {
                    if (err) {
                        console.error('Error al consultar después del update:', err);
                        rl.close();
                        return;
                    }

                    console.log(resultadosDespues);

                    console.timeEnd('Conexión con Pooling');
                    rl.close();
                    pool.end(); 
                });
            });
        });
    });
});
