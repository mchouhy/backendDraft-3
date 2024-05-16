// Importación del service de productos:
import { ProductService } from "../services/productService.js";
// Llamado de la función constructora:
const productService = new ProductService();

// Función de clase constructora del controlador de Carts:
export class ProductController {
  getProducts = async (request, response) => {
    try {
      const { limit = 2, page = 1, sort, query } = request.query;
      const products = await productService.getProducts({
        limit: parseInt(limit),
        page: parseInt(page),
        sort,
        query,
      });
      response.json({
        status: "success",
        payload: products,
        page: products.page,
        nextPage: products.nextPage,
        previousPage: products.previousPage,
        hasNextPage: products.hasNextPage,
        hasPreviousPage: products.hasPreviousPage,
        totalPages: products.totalPages,
        previousLink: products.hasPreviousPage
          ? `/api/products?limit=${limit}&page=${products.previousPage}&sort=${sort}&query=${query}`
          : null,
        nextLink: products.hasNextPage
          ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}`
          : null,
      });
    } catch (error) {
      console.log("Error al obtener los productos de Mongo Atlas.", error);
      response.status(500).json({ error: "Error interno del servidor." });
    }
  };

  getProductById = async (request, response) => {
    // Se define la variable que aplica el request params del id a ingresar por el cliente:
    const { prodId } = request.params;
    try {
      const product = await productService.getProductById(prodId);
      if (!product) {
        return response.json({ error: "Producto no encontrado." });
      }
      response.json(product);
    } catch (error) {
      response
        .status(500)
        .json({ error: "No existe un producto con el id ingresado." });
    }
  };

  addProduct = async (request, response) => {
    const newProduct = request.body;
    try {
      await productService.addProduct(newProduct);
      response.status(201).json({ message: "Producto agregado con éxito." });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Error. No se pudo agregar el producto." });
    }
  };

  updateProduct = async (request, response) => {
    const { prodId } = request.params;
    const updatedProduct = request.body;
    try {
      await productService.updateProduct(prodId, updatedProduct);
      response
        .status(201)
        .json({ message: "Producto actualizado exitosamente." });
    } catch (error) {
      response
        .status(500)
        .json({ error: "No se pudo actualizar el producto." });
    }
  };

  deleteProductById = async (request, response) => {
    const { prodId } = request.params;
    try {
      await productService.deleteProductById(prodId);
      response.status(201).json({ message: "Producto eliminado con éxito." });
    } catch (error) {
      response.status(500).json({ error: "No se pudo eliminar el producto." });
    }
  };
}
