import { useCallback, useEffect, useState } from 'react';
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from 'reactstrap';
import Swal from 'sweetalert2';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [productoEditando, setProductoEditando] = useState(null);
  const [modalCrear, setModalCrear] = useState(false);

  const toggleModalCrear = () => {
    setModalCrear(!modalCrear);
    setNuevoNombre('');
  };

  const fetchProductos = useCallback(async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      const data = await respuesta.json();
      setProductos(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo cargar la lista de productos.',
      });
    }
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [fetchProductos]);

  const handleCrear = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nuevoNombre }),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: 'success',
        title: '¡Producto creado!',
        timer: 1500,
        showConfirmButton: false,
      });

      setNuevoNombre('');
      toggleModalCrear();
      fetchProductos();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el producto.',
      });
    }
  };

  const handleEliminar = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esto eliminará el producto permanentemente!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/productos/${id}`, {
          method: 'DELETE',
        });

        if (!res.ok) throw new Error();

        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Producto eliminado correctamente.',
          timer: 1500,
          showConfirmButton: false,
        });

        fetchProductos();
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo eliminar el producto.',
        });
      }
    }
  };

  const handleEditar = (producto) => {
    setProductoEditando(producto);
  };

  const handleActualizar = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/productos/${productoEditando.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productoEditando),
      });

      if (!res.ok) throw new Error();

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        timer: 1500,
        showConfirmButton: false,
      });

      setProductoEditando(null);
      fetchProductos();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el producto.',
      });
    }
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Productos</h1>

      <Button color="primary" onClick={toggleModalCrear}>
        Agregar Producto
      </Button>

      <Modal isOpen={modalCrear} toggle={toggleModalCrear}>
        <ModalHeader toggle={toggleModalCrear}>Nuevo Producto</ModalHeader>
        <ModalBody>
          <Input
            type="text"
            placeholder="Nombre del producto"
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={handleCrear}
            disabled={!nuevoNombre.trim()}
          >
            Guardar
          </Button>
          <Button color="secondary" onClick={toggleModalCrear}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {productoEditando && (
        <form onSubmit={handleActualizar} className="mt-3">
          <Input
            type="text"
            value={productoEditando.nombre}
            onChange={(e) =>
              setProductoEditando({ ...productoEditando, nombre: e.target.value })
            }
            required
          />
          <div className="mt-2">
            <Button type="submit" color="warning" className="me-2">
              Guardar cambios
            </Button>
            <Button color="secondary" onClick={() => setProductoEditando(null)}>
              Cancelar
            </Button>
          </div>
        </form>
      )}

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>
                <Button
                  color="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEditar(producto)}
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => handleEliminar(producto.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
