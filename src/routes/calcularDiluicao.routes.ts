import { Router } from "express";
import { CalculoDiluicaoController } from "../controllers/CalculoDiluicaoController";

const calculoDiluicaoRouter = Router();

const calculoDiluicaoController = new CalculoDiluicaoController();

calculoDiluicaoRouter.get("/", calculoDiluicaoController.calcularDiluicao);

export default calculoDiluicaoRouter;
