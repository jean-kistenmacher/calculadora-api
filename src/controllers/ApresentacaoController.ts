import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class ApresentacaoController {

  async createApresentacao (request: Request, response: Response) {
    const { qtdApresentacao, bolsa, idMedicamento, idLaboratorio, idMarca } = request.body;

    const apresentacao = await prismaClient.apresentacao.create({
      data: {
        id_medicamento: idMedicamento,
        id_marca: idMarca,
        id_laboratorio: idLaboratorio,
        qtd_apresentacao: qtdApresentacao,
        bolsa: bolsa,
      }
    })

    return response.json(apresentacao);
  }

  async getApresentacoes (request: Request, response: Response) {
    const { idMedicamento } = request.query;
    try {
      const apresentacaos = await prismaClient.apresentacao.findMany(
        {
          where: {
            id_medicamento: Number(idMedicamento)
          },
          orderBy: { marca: { nome: "asc" } },
          include: {
            marca: true,
            laboratorio: true
          }
        }
      );
      return response.json(apresentacaos);
    } catch (error) {
      return response.json(error);
    }

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
    const { qtdApresentacao, bolsa, idMedicamento, idLaboratorio, idMarca } = request.body;
    const updateApresentacao = await prismaClient.apresentacao.update({
      where: {
        id: parseInt(id),
      },
      data: {
        id_medicamento: idMedicamento,
        id_marca: idMarca,
        id_laboratorio: idLaboratorio,
        qtd_apresentacao: qtdApresentacao,
        bolsa: bolsa,
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
