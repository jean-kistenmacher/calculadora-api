import { Router } from "express";
import { LaboratorioController } from "../controllers/LaboratorioController";

const laboratorioRouter = Router();

const laboratorioController = new LaboratorioController();


laboratorioRouter.post("/", laboratorioController.createLaboratorio);

laboratorioRouter.put("/:id", laboratorioController.updateLaboratorio);

laboratorioRouter.get("/", laboratorioController.getLaboratorios);
laboratorioRouter.get("/all", laboratorioController.getAllLaboratorios);
laboratorioRouter.get("/:id", laboratorioController.getLaboratorioById);


laboratorioRouter.delete("/:id", laboratorioController.removeLaboratorio);

export default laboratorioRouter;
