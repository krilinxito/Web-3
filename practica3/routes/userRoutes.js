const express = require('express');
const router = express.Router();
const pool = require('../db'); // conexión al pool de MySQL

// Mostrar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM cruduser');
    res.render('index', { usuarios });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error del servidor');
  }
});

// Insertar un nuevo usuario
router.post('/usuarios', async (req, res) => {
  const { nombre, correo } = req.body;
  try {
    await pool.query('INSERT INTO cruduser (nombre, correo) VALUES (?, ?)', [nombre, correo]);
    res.redirect('/?mensaje=creado');
  } catch (error) {
    console.error('Error al insertar usuario:', error);
    res.status(500).send('Error al insertar');
  }
});

// Eliminar usuario
router.get('/usuarios/eliminar/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM cruduser WHERE id = ?', [id]);
    res.redirect('/?mensaje=eliminado');
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error al eliminar');
  }
});

// Mostrar formulario de edición
router.get('/usuarios/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('SELECT * FROM cruduser WHERE id = ?', [id]);

    if (result.length === 0) {
      return res.redirect('/?mensaje=noencontrado');
    }

    const usuario = result[0];
    res.render('editar', { usuario });
  } catch (error) {
    console.error('Error al cargar usuario para editar:', error);
    res.status(500).send('Error al cargar datos');
  }
});

// Procesar edición
router.post('/usuarios/editar/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, correo } = req.body;
  try {
    await pool.query('UPDATE cruduser SET nombre = ?, correo = ? WHERE id = ?', [nombre, correo, id]);
    res.redirect('/?mensaje=editado');
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error al actualizar');
  }
});

module.exports = router;
