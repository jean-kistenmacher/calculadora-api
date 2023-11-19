import { Router } from "express";
import { CalculoDiluicaoController } from "../controllers/CalculoDiluicaoController";

const calculoDiluicaoRouter = Router();

const calculoDiluicaoController = new CalculoDiluicaoController();

calculoDiluicaoRouter.post("/", calculoDiluicaoController.calcularDiluicao);

export default calculoDiluicaoRouter;
