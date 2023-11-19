import { Router } from "express";
import { DiluicaoController } from "../controllers/DiluicaoController";

const diluicaoRouter = Router();

const acessoController = new DiluicaoController();


diluicaoRouter.post("/", acessoController.createDiluicao);

diluicaoRouter.post("/:id", acessoController.updateDiluicao);

diluicaoRouter.get("/", acessoController.getDiluicoes);
diluicaoRouter.get("/:id", acessoController.getDiluicaoById);

diluicaoRouter.delete("/:id", acessoController.removeDiluicao);


export default diluicaoRouter;
