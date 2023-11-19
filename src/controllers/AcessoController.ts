import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class AcessoController {

  async createAcesso (request: Request, response: Response) {
    const { nome } = request.body;

    const acesso = await prismaClient.acesso.create({
      data: {
        nome
      }
    })

    return response.json(acesso);
  }

  async getAcessos (request: Request, response: Response) {
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
  }

  async getAllAcessos (request: Request, response: Response) {
    const acessos = await prismaClient.acesso.findMany({ orderBy: { nome: 'asc' } });
    return response.json(acessos);
  }

  async getAcessoById (request: Request, response: Response) {
    const { id } = request.params;
    const acesso = await prismaClient.acesso.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(acesso);
  }


  async updateAcesso (request: Request, response: Response) {
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
