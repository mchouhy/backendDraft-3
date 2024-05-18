// Importación de Express JS:
import { Router } from "express";
// Creación del Router de Express JS:
const viewsRouter = Router();
// Importación del manejador de views:
import { ViewController } from "../controllers/view.controller.js";
// Llamado de la función de viewController:
const viewController = new ViewController();
// Importación de passport:
import passport from "passport";
//

// Ruta GET para renderizar los productos:
viewsRouter.get("/products", checkUserRole);
