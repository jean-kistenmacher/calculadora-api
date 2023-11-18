import { Router } from "express";
import { MedicamentoController } from "../controllers/MedicamentoController";

const medicamentoRouter = Router();

const medicamentoController = new MedicamentoController();


medicamentoRouter.post("/", medicamentoController.createMedicamento);

medicamentoRouter.put("/:id", medicamentoController.updateMedicamento);

medicamentoRouter.get("/", medicamentoController.getMedicamentos);
medicamentoRouter.get("/:id", medicamentoController.getMedicamentosById);

medicamentoRouter.delete("/:id", medicamentoController.removeMedicamento);

export default medicamentoRouter;
