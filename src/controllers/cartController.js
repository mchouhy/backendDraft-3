// Importación del service de carts:
import { CartRepository } from "../repositories/cartRepository.js";
// Llamado de la función constructora:
const cartRepository = new CartRepository();
// Importación del model de carts:
import { cartModel } from "../models/carts.model.js";

// Función de clase constructora del controlador de Carts:
export class CartController {
  newCart = async (request, response) => {
    try {
      const newCart = await cartRepository.createCart();
      response.json(newCart);
    } catch (error) {
      response.status(500).json({ error: "Error al crear el cart." });
    }
  };

  getCartById = async (request, response) => {
    const cartId = request.params.cid;
    try {
      const cart = await cartModel.findById(cartId);
      if (!cart) {
        console.log("No existe un cart con el id ingresado.", error);
        return response
          .status(404)
          .json({ error: "Cart por id ingresado no existe." });
      }
      return response.json(cart.products);
    } catch (error) {
      response.status(500).json({
        error: "Error. No se pudo obtener el producto del cart por id.",
      });
    }
  };

  addProduct = async (request, response) => {
    const cartId = request.params.cid;
    const prodId = request.params.pid;
    const quantity = request.body.quantity || 1;
    try {
      const updateCart = await cartRepository.addProduct(
        cartId,
        prodId,
        quantity
      );
      response.json(updateCart.products);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error. No se pudo agregar el producto" });
    }
  };

  deleteProductById = async (request, response) => {
    const cartId = request.params.cid;
    const prodId = request.params.pid;
    try {
      const updateCart = await cartRepository.deleteProduct(cartId, prodId);
      response.json({
        status: "success",
        message: "Producto eliminado con éxito.",
        updateCart,
      });
    } catch (error) {
      console.log("Error al eliminar el producto del cart", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  };

  updateCart = async (request, response) => {
    const cartId = request.params.cid;
    // Se envía un array de productos en el body de la solicitud:
    const updatedProducts = request.body;
    try {
      const updatedCart = await cartRepository.updateCart(
        cartId,
        updatedProducts
      );
      response.json(updatedCart);
    } catch (error) {
      console.log("Error al actualizar el cart", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  };

  updateProductQuantity = async (request, response) => {
    const cartId = request.params.cid;
    const prodId = request.params.pid;
    const newQuantity = request.body.quantity;
    try {
      const updatedCart = await cartRepository.updateProductQuantity(
        cartId,
        prodId,
        newQuantity
      );
      response.json({
        status: "success",
        message: "Cantidad del producto actualizada con éxito.",
        updatedCart,
      });
    } catch (error) {
      console.log(
        "Error al actualizar la cantidad de productos el cart.",
        error
      );
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor.",
      });
    }
  };

  emptyCart = async (request, response) => {
    const cartId = request.params.cid;
    try {
      const updatedCart = await cartRepository.emptyCart(cartId);
      response.json({
        status: "success",
        message: "Se eliminaron con éxito los productos del cart.",
        updatedCart,
      });
    } catch (error) {
      console.log("Error al intentar vaciar el cart.", error);
      res.status(500).json({
        status: "error",
        error: "Error interno del servidor",
      });
    }
  };
}
