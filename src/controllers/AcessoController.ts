import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class AcessoController {

  async createAcesso (request: Request, response: Response) {
    try {
      const { nome } = request.body;
      const acesso = await prismaClient.acesso.create({
        data: {
          nome
        }
      })

      return response.json(acesso);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getAcessos (request: Request, response: Response) {
    try {
      const pageSize = 5;
      let search = "";
      const { page } = request.query;
      if (request.query.search) {
        search = request.query.search as string;
      }
      const skip = (Number(page) - 1) * pageSize;
      const totalCount = await prismaClient.acesso.count({
        where: {
          nome: {
            startsWith: search
          }
        },
      });
      const acessos = await prismaClient.acesso.findMany({
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
      return response.json({ acessos, totalPages });
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getAllAcessos (request: Request, response: Response) {
    try {
      const acessos = await prismaClient.acesso.findMany({ orderBy: { nome: 'asc' } });
      return response.json(acessos);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getAcessoById (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const acesso = await prismaClient.acesso.findUnique({
        where: {
          id: parseInt(id)
        },
      })
      return response.json(acesso);
    } catch (error) {
      return response.status(400).json(error);
    }
  }


  async updateAcesso (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { nome } = request.body;
      const updateAcesso = await prismaClient.acesso.update({
        where: {
          id: parseInt(id),
        },
        data: {
          nome
        },
      })
      return response.json(updateAcesso);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async removeAcesso (request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteAcesso = await prismaClient.acesso.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteAcesso);
    } catch (error) {
      const message = "Registro está vinculado em outro dado"
      return response.status(200).json({ error: message });
    }
  }
}
