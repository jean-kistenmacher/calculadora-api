import { Router } from "express";
import farmacoRouter from "./farmaco.routes";
import marcaRouter from "./marca.routes";
import laboratorioRouter from "./laboratorio.routes";
import acessoRouter from "./acesso.routes";
import viaRouter from "./via.routes";
import medicamentoRouter from "./medicamento.routes";

const router = Router();

router.use('/farmaco', farmacoRouter)
router.use('/marca', marcaRouter)
router.use('/laboratorio', laboratorioRouter)
router.use('/acesso', acessoRouter)
router.use('/via', viaRouter)
router.use('/medicamento', medicamentoRouter)

export { router };
