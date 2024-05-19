import { Socket } from "socket.io";
import { messageModel } from "../models/message.model.js";
import { ProductRepository } from "../repositories/productRepository.js";
const productRepository = new ProductRepository();

export class SocketManager {
  constructor(httpServer) {
    this.io = socket(httpServer);
    this.initSocketEvents();

    initSocketEvents = async () => {
      socket.on("message", async (data) => {
        // Guardado del mensaje en la colección de mensajes de la base de datos de Mongo Atlas:
        await messageModel.create(data);
        // Obtención de los mensajes de Mongo Atlas y envío al cliente:
        const messages = await messageModel.find();
        socket.emit("message", messages);
      });

      socket.emit("products", await productRepository.getProducts());

      socket.on("deleteProduct", async (id) => {
        await productRepository.deleteProductById(id);
      });
    };
  }
}
