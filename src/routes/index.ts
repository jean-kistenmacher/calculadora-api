import { Router } from "express";
import medicamentoRouter from "./medicamento.routes";
import marcaRouter from "./marca.routes";
import laboratorioRouter from "./laboratorio.routes";
import acessoRouter from "./acesso.routes";
import viaRouter from "./via.routes";
import apresentacaoRouter from "./apresentacao.routes";
import diluicaoRouter from "./diluicao.routes";
import calculoDiluicaoRouter from "./calcularDiluicao.routes";
import unidadeRouter from "./unidade.routes";

const router = Router();

router.use('/medicamento', medicamentoRouter)
router.use('/marca', marcaRouter)
router.use('/laboratorio', laboratorioRouter)
router.use('/acesso', acessoRouter)
router.use('/via', viaRouter)
router.use('/apresentacao', apresentacaoRouter)
router.use('/diluicao', diluicaoRouter)
router.use('/calculoDiluicao', calculoDiluicaoRouter)
router.use('/unidade', unidadeRouter)


export { router };
