import { productModel } from "../models/products.model.js";
import { CartRepository } from "../repositories/cartRepository.js";
const cartRepository = new CartRepository();

export class ViewController {
  async productView(request, response) {
    let { limit = 2, page = 1, sort, query } = request.query;
    try {
      const products = await productService.getProducts({
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
        user: request.session.user,
      });
    } catch (error) {
      console.log("Error al obtener los productos de la base de datos.", error);
      response.status(500).json({ error: "Error al obtener los productos." });
    }
  }
}
