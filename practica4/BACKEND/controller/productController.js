import * as Producto from '../model/productModel.js';

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const productos = await Producto.Products();
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error en controlador:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.getProductById(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error('Error al obtener producto por ID:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ error: 'Falta el nombre del producto' });
    }

    const productoCreado = await Producto.createProduct({ nombre });
    res.status(201).json(productoCreado);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Actualizar un producto existente
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: 'Falta el nombre del producto' });
    }

    const actualizado = await Producto.updateProduct(id, { nombre });

    if (!actualizado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminado = await Producto.deleteProduct(id);
    if (!eliminado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
