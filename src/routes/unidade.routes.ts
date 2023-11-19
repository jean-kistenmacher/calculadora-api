import { Router } from "express";
import { UnidadeController } from "../controllers/UnidadeController";

const unidadeRouter = Router();

const unidadeController = new UnidadeController();


unidadeRouter.post("/", unidadeController.createUnidade);

unidadeRouter.put("/:id", unidadeController.updateUnidade);

unidadeRouter.get("/", unidadeController.getUnidades);
unidadeRouter.get("/all", unidadeController.getAllUnidades);
unidadeRouter.get("/:id", unidadeController.getUnidadeById);

unidadeRouter.delete("/:id", unidadeController.removeUnidade);


export default unidadeRouter;
