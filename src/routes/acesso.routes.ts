import { Router } from "express";
import { AcessoController } from "../controllers/AcessoController";

const acessoRouter = Router();

const acessoController = new AcessoController();


acessoRouter.post("/", acessoController.createAcesso);

acessoRouter.put("/:id", acessoController.updateAcesso);

acessoRouter.get("/", acessoController.getAcessos);
acessoRouter.get("/:id", acessoController.getAcessoById);

acessoRouter.delete("/:id", acessoController.removeAcesso);


export default acessoRouter;
