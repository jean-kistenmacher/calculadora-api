import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class ViaController {

  async createVia (request: Request, response: Response) {
    const { nome } = request.body;

    const via = await prismaClient.via_Administracao.create({
      data: {
        nome
      }
    })

    return response.json(via);
  }

  async getVias (request: Request, response: Response) {
    const pageSize = 5;
    let search = "";
    const { page } = request.query;
    if (request.query.search) {
      search = request.query.search as string;
    }
    const skip = (Number(page) - 1) * pageSize;
    const totalCount = await prismaClient.via_Administracao.count({
      where: {
        nome: {
          startsWith: search
        }
      },
    });
    const vias = await prismaClient.via_Administracao.findMany({
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
    return response.json({ vias, totalPages });
  }

  async getViaById (request: Request, response: Response) {
    const { id } = request.params;
    const via = await prismaClient.via_Administracao.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(via);
  }

  async updateVia (request: Request, response: Response) {
    const { id } = request.params;
    const { nome } = request.body;
    const updateVia = await prismaClient.via_Administracao.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome
      },
    })
    return response.json(updateVia);
  }

  async removeVia (request: Request, response: Response) {
    const { id } = request.params;
    const deleteVia = await prismaClient.via_Administracao.delete({
      where: {
        id: parseInt(id),
      },
    })
    return response.json(deleteVia);
  }
}
