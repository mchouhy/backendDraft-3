// Importación del Router de Express JS:
import { Router } from "express";
// Creación del Router de Sessions:
const usersApiRouter = Router();
// Importación de Passport:
import passport from "passport";
// Importación del controlador de usuarios:
import { UserController } from "../../controllers/userController.js";

const userController = new UserController();

// Ruta POST de register:
usersApiRouter.post("/register", userController.register);

// Ruta POST de login:
usersApiRouter.post("/login", userController.login);

// Ruta GET de logout de la sesión:
usersApiRouter.get("/logout", userController.logout.bind(userController));

// Ruta Get de profile de usuario:
usersApiRouter.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.profile
);

// Ruta Get de profile de admin:
usersApiRouter.get(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  userController.admin
);

//VERSIÓN DE PASSPORT GITHUB:
usersApiRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
  async (request, response) => {}
);

usersApiRouter.get(
  "/githubcallback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (request, response) => {
    // Agregamos el usuario que viene de Github al objeto de sesión:
    request.session.user = request.user;
    request.session.login = true;
    response.redirect("/profile");
  }
);

// Exportación del router del api de Sessions:
export default usersApiRouter;
