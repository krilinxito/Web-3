import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const route = Router();

route.get('/productos', getProducts);
route.get('/productos/:id', getProductById);
route.post('/productos', createProduct);
route.put('/productos/:id', updateProduct);
route.delete('/productos/:id', deleteProduct);

export default route;
