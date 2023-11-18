import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class ApresentacaoController {

  async createApresentacao (request: Request, response: Response) {
    const { qtdApresentacao, bolsa, idFarmaco, idLaboratorio, idMarca } = request.body;

    const apresentacao = await prismaClient.apresentacao.create({
      data: {
        qtd_apresentacao: qtdApresentacao,
        bolsa: bolsa,
        id_medicamento: idFarmaco,
        id_laboratorio: idLaboratorio,
        id_marca: idMarca,
      }
    })

    return response.json(apresentacao);
  }

  async getApresentacoes (request: Request, response: Response) {
    const apresentacaos = await prismaClient.apresentacao.findMany({ orderBy: { marca: { nome: "asc" } } });
    return response.json(apresentacaos);
  }

  async getApresentacaoById (request: Request, response: Response) {
    const { id } = request.params;
    const apresentacao = await prismaClient.apresentacao.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(apresentacao);
  }


  async updateApresentacao (request: Request, response: Response) {
    const { id } = request.params;
    const { qtdApresentacao, bolsa, idFarmaco, idLaboratorio, idMarca } = request.body;
    const updateApresentacao = await prismaClient.apresentacao.update({
      where: {
        id: parseInt(id),
      },
      data: {
        qtd_apresentacao: qtdApresentacao,
        bolsa: bolsa,
        id_medicamento: idFarmaco,
        id_laboratorio: idLaboratorio,
        id_marca: idMarca,
      }
    })
    return response.json(updateApresentacao);
  }

  async removeApresentacao (request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteApresentacao = await prismaClient.apresentacao.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteApresentacao);
    } catch (error) {
      const message = "Registro está vinculado em outro dado"
      return response.status(200).json({ error: message });
    }
  }

}
