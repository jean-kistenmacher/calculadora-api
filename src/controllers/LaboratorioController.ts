import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class LaboratorioController {

  async createLaboratorio (request: Request, response: Response) {
    const { nome } = request.body;

    const laboratorio = await prismaClient.laboratorio.create({
      data: {
        nome
      }
    })

    return response.json(laboratorio);
  }

  async getLaboratorios (request: Request, response: Response) {
    const pageSize = 5;
    let search = "";
    const { page } = request.query;
    if (request.query.search) {
      search = request.query.search as string;
    }
    const skip = (Number(page) - 1) * pageSize;
    const totalCount = await prismaClient.laboratorio.count({
      where: {
        nome: {
          startsWith: search
        }
      },
    });
    const laboratorios = await prismaClient.laboratorio.findMany({
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
    return response.json({ laboratorios, totalPages });
  }

  async getLaboratorioById (request: Request, response: Response) {
    const { id } = request.params;
    const laboratorio = await prismaClient.laboratorio.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(laboratorio);
  }

  async updateLaboratorio (request: Request, response: Response) {
    const { id } = request.params;
    const { nome } = request.body;
    const updateLaboratorio = await prismaClient.laboratorio.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome
      },
    })
    return response.json(updateLaboratorio);
  }

  async removeLaboratorio (request: Request, response: Response) {
    const { id } = request.params;
    const deleteLaboratorio = await prismaClient.laboratorio.delete({
      where: {
        id: parseInt(id),
      },
    })
    return response.json(deleteLaboratorio);
  }

}
