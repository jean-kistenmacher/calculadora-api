import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class CalculoDiluicaoController {

  async calcularDiluicao (request: Request, response: Response) {
    const { idApresentacao, idVia, idAcesso, dose } = request.body;
    const calculoDiluicao = await prismaClient.calculoDiluicao.findFirst({
      where: {
        id_apresentacao: idApresentacao,
        id_via: idVia,
        id_acesso: idAcesso
      },
      include: {
        apresentacao: true,
      }
    });
    const aspirar = Number(dose) / Number(calculoDiluicao?.concentracao);
    const resposta = { ...calculoDiluicao, aspirar, dose }
    return response.json(resposta);
  }

}
