import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class UnidadeController {

  async createUnidade (request: Request, response: Response) {
    try {
      const { nome } = request.body;
      const unidade = await prismaClient.unidade_Medida.create({
        data: {
          nome
        }
      })

      return response.json(unidade);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getUnidades (request: Request, response: Response) {
    try {
      const pageSize = 5;
      let search = "";
      const { page } = request.query;
      if (request.query.search) {
        search = request.query.search as string;
      }
      const skip = (Number(page) - 1) * pageSize;
      const totalCount = await prismaClient.unidade_Medida.count({
        where: {
          nome: {
            startsWith: search
          }
        },
      });
      const unidades = await prismaClient.unidade_Medida.findMany({
        skip,
        take: pageSize,
        where: {
          nome: {
            startsWith: search
          }
        },
        orderBy: {
          nome: 'asc'
        },
      })
      const totalPages = Math.ceil(totalCount / pageSize);
      return response.json({ unidades, totalPages });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getAllUnidades (request: Request, response: Response) {
    try {
      const unidades = await prismaClient.unidade_Medida.findMany({ orderBy: { nome: 'asc' } });
      return response.json(unidades);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getUnidadeById (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const unidade = await prismaClient.unidade_Medida.findUnique({
        where: {
          id: parseInt(id)
        },
      })
      return response.json(unidade);
    } catch (error) {
      return response.status(400).json(error);
    }
  }


  async updateUnidade (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome } = request.body;
      const updateUnidade = await prismaClient.unidade_Medida.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nome
        },
      })
      return response.json(updateUnidade);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async removeUnidade (request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteUnidade = await prismaClient.unidade_Medida.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteUnidade);
    } catch (error) {
      const message = "Registro está vinculado em outro dado"
      return response.status(200).json({ error: message });
    }
  }
}
