import { Router } from "express";
import { MarcaController } from "../controllers/MarcaController";

const marcaRouter = Router();

const marcaController = new MarcaController();


marcaRouter.post("/", marcaController.createMarca);

marcaRouter.put("/:id", marcaController.updateMarca);

marcaRouter.get("/", marcaController.getMarcas);
marcaRouter.get("/:id", marcaController.getMarcaById);

marcaRouter.delete("/:id", marcaController.removeMarca);

export default marcaRouter;
