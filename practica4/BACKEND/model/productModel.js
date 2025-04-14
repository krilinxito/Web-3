import pool from '../config/db.js';

// Obtener todos los productos
export const Products = async () => {
  const [array] = await pool.query('SELECT * FROM productos');
  return array;
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
  return rows[0];
};

// Crear un nuevo producto (solo con nombre)
export const createProduct = async ({ nombre }) => {
  const [result] = await pool.query(
    'INSERT INTO productos (nombre) VALUES (?)',
    [nombre]
  );
  return { id: result.insertId, nombre };
};

// Actualizar un producto (solo con nombre)
export const updateProduct = async (id, { nombre }) => {
  const [result] = await pool.query(
    'UPDATE productos SET nombre = ? WHERE id = ?',
    [nombre, id]
  );
  return result.affectedRows > 0;
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
  return result.affectedRows > 0;
};
