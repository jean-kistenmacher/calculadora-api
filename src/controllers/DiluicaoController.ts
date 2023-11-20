import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class DiluicaoController {

  async createDiluicao (request: Request, response: Response) {
    try {
      const { concentracao, diluicao, estabilidade, observacao, reconstituicao, tempoAdm, idApresentacao, idAcesso, idVia, idUnidade } = request.body;
      const calcDiluicao = await prismaClient.calculoDiluicao.create({
        data: {
          id_apresentacao: idApresentacao,
          id_via: idVia,
          id_acesso: idAcesso,
          id_unidade_medida: idUnidade,
          reconstituicao: reconstituicao,
          diluicao: diluicao,
          concentracao: concentracao,
          estabilidade: estabilidade,
          tempo_adm: tempoAdm,
          observacao: observacao,
        }
      })

      return response.json(calcDiluicao);
    } catch (error) {
      return response.status(400).json(error);
    }
  }


  async getDiluicoes (request: Request, response: Response) {
    try {
      const { idMedicamento } = request.query;
      const diluicaos = await prismaClient.calculoDiluicao.findMany(
        {
          where: {
            apresentacao: {
              id_medicamento: Number(idMedicamento)
            }
          },
          orderBy: { apresentacao: { marca: { nome: "asc" } } },
          include: {
            acesso: true,
            apresentacao: {
              include: {
                medicamento: true,
                marca: true,
                laboratorio: true
              }
            },
            via: true,
            unidadeMedida: true
          }
        }
      )
      return response.json(diluicaos);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getDiluicaoById (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const diluicao = await prismaClient.calculoDiluicao.findUnique({
        where: {
          id: parseInt(id)
        },
      })
      return response.json(diluicao);
    } catch (error) {
      return response.status(400).json(error);
    }
  }


  async updateDiluicao (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { concentracao, diluicao, estabilidade, observacao, reconstituicao, tempoAdm, idApresentacao, idAcesso, idVia, idUnidade } = request.body;
      const updateDiluicao = await prismaClient.calculoDiluicao.update({
        where: {
          id: parseInt(id),
        },
        data: {
          id_apresentacao: idApresentacao,
          id_via: idVia,
          id_acesso: idAcesso,
          id_unidade_medida: idUnidade,
          reconstituicao: reconstituicao,
          diluicao: diluicao,
          concentracao: concentracao,
          estabilidade: estabilidade,
          tempo_adm: tempoAdm,
          observacao: observacao,
        }
      })
      return response.json(updateDiluicao);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async removeDiluicao (request: Request, response: Response) {
    try {

      const { id } = request.params;
      const deleteDiluicao = await prismaClient.calculoDiluicao.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteDiluicao);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

}
