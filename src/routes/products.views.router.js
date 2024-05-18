// Importación de Express JS:
import { Router } from "express";
// Creación del Router de Express JS:
const productsViewsRouter = Router();
// Importación del manejador de productos:
import { ProductService } from "../services/productService.js";
// Llamado de la función de productService:
const productService = new ProductService();

// Ruta GET para renderizar los productos:
productsViewsRouter.get("/", async (request, response) => {});

// Exportación del router para ser utilizado en la app:
export { productsViewsRouter };
