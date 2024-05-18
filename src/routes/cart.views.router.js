// Importación de Express JS:
import { Router } from "express";
// Creación del Router de Express JS:
const cartViewsRouter = Router();
// Importación del manejador de carts:
import { CartRepository } from "../repositories/cartRepository.js";
// Llamado de la función de cartManager:
const cartRepository = new CartRepository();

// Ruta GET para renderizar el cart por id:
cartViewsRouter.get("/:cid", async (request, response) => {});

// Exportación del router para ser utilizado en la app:
export { cartViewsRouter };
