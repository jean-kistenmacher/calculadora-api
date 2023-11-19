import { Router } from "express";
import { ApresentacaoController } from "../controllers/ApresentacaoController";

const apresentacaoRouter = Router();

const apresentacaoController = new ApresentacaoController();


apresentacaoRouter.post("/", apresentacaoController.createApresentacao);

apresentacaoRouter.post("/:id", apresentacaoController.updateApresentacao);

apresentacaoRouter.get("/", apresentacaoController.getApresentacoes);
apresentacaoRouter.get("/:id", apresentacaoController.getApresentacaoById);

apresentacaoRouter.delete("/:id", apresentacaoController.removeApresentacao);


export default apresentacaoRouter;
