import { ProductRepository } from "../repositories/productRepository.js";
import { CartRepository } from "../repositories/cartRepository.js";
const productRepository = new ProductRepository();
const cartRepository = new CartRepository();

export class ViewController {
  async renderProducts(request, response) {
    let { limit = 2, page = 1, sort, query } = request.query;
    try {
      const products = await productRepository.getProducts({
        limit: parseInt(limit),
        page: parseInt(page),
        sort,
        query,
      });
      const productsArray = products.data.map((product) => {
        const { _id, ...rest } = product.toObject();
        return rest;
      });
      response.render("products", {
        products: productsArray,
        currentPage: products.page,
        nextPage: products.nextPage,
        previousPage: products.previousPage,
        hasNextPage: products.hasNextPage,
        hasPreviousPage: products.hasPreviousPage,
        totalPages: products.totalPages,
        query,
        sort,
        limit,
        user,
        //request.session.user,
      });
    } catch (error) {
      console.log("Error al obtener los productos de la base de datos.", error);
      response.status(500).json({ error: "Error al obtener los productos." });
    }
  }

  async renderCart(request, response) {
    const cartId = request.params.cid;
    try {
      const cart = await CartRepository.getCartById(cartId);
      let totalOrder = 0;
      const cartData = cart.products.map((item) => {
        const product = item.product.toObject();
        const quantity = item.quantity;
        const totalPrice = product.price * quantity;
        totalOrder += totalPrice;

        return {
          product: { ...product, totalPrice },
          quantity,
          cartId,
        };
      });
      response.render("carts", { cartproducts: cartData, totalOrder, cartId });
    } catch (error) {
      console.log("Error en el servidor al buscar el cart por id", error);
      response
        .status(500)
        .json({ error: "Error en el servidor al intentar obtener el cart." });
    }
  }

  async renderRegister(request, response) {
    response.render("register");
  }

  async renderLogin(request, response) {
    response.render("login");
  }

  async renderRealTimeProducts(request, response) {
    response.render("realtimeproducts");
  }

  async renderChat(request, response) {
    response.render("chat");
  }

  async renderHomePage(request, response) {
    response.render("home");
  }
}
