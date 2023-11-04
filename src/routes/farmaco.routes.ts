import { Router } from "express";
import { FarmacoController } from "../controllers/FarmacoController";

const farmacoRouter = Router();

const farmacoController = new FarmacoController();


farmacoRouter.post("/", farmacoController.createFarmaco);

farmacoRouter.put("/:id", farmacoController.updateFarmaco);

farmacoRouter.get("/", farmacoController.getFarmacos);
farmacoRouter.get("/:id", farmacoController.getFarmacosById);

farmacoRouter.delete("/:id", farmacoController.removeFarmaco);

export default farmacoRouter;
