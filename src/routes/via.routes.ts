import { Router } from "express";
import { ViaController } from "../controllers/ViaController";

const viaRouter = Router();

const viaController = new ViaController();


viaRouter.post("/", viaController.createVia);

viaRouter.put("/:id", viaController.updateVia);

viaRouter.get("/", viaController.getVias);
viaRouter.get("/all", viaController.getAllVias);
viaRouter.get("/:id", viaController.getViaById);

viaRouter.delete("/:id", viaController.removeVia);

export default viaRouter;
