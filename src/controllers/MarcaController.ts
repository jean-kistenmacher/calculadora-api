import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class MarcaController {

  async createMarca (request: Request, response: Response) {
    const { nome } = request.body;

    const marca = await prismaClient.marca.create({
      data: {
        nome
      }
    })

    return response.json(marca);
  }

  async getMarcas (request: Request, response: Response) {
    const pageSize = 5;
    let search = "";
    const { page } = request.query;
    if (request.query.search) {
      search = request.query.search as string;
    }
    const skip = (Number(page) - 1) * pageSize;
    const totalCount = await prismaClient.marca.count({
      where: {
        nome: {
          startsWith: search
        }
      },
    });
    const marcas = await prismaClient.marca.findMany({
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
    return response.json({ marcas, totalPages });
  }

  async getMarcaById (request: Request, response: Response) {
    const { id } = request.params;
    const marca = await prismaClient.marca.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(marca);
  }

  async updateMarca (request: Request, response: Response) {
    const { id } = request.params;
    const { nome } = request.body;
    const updateMarca = await prismaClient.marca.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome
      },
    })
    return response.json(updateMarca);
  }

  async removeMarca (request: Request, response: Response) {
    const { id } = request.params;
    const deleteMarca = await prismaClient.marca.delete({
      where: {
        id: parseInt(id),
      },
    })
    return response.json(deleteMarca);
  }

}
