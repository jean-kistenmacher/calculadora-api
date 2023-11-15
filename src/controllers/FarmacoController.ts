import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class FarmacoController {

  async createFarmaco (request: Request, response: Response) {
    const { nome } = request.body;

    const farmaco = await prismaClient.farmaco.create({
      data: {
        nome
      }
    })

    return response.json(farmaco);
  }

  async getFarmacos (request: Request, response: Response) {
    const pageSize = 5;
    let search = "";
    const { page } = request.query;
    if (request.query.search) {
      search = request.query.search as string;
    }
    const skip = (Number(page) - 1) * pageSize;
    const totalCount = await prismaClient.farmaco.count({
      where: {
        nome: {
          startsWith: search
        }
      },
    });
    const farmacos = await prismaClient.farmaco.findMany({
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
    return response.json({ farmacos, totalPages });
  }

  async getFarmacosById (request: Request, response: Response) {
    const { id } = request.params;
    const farmaco = await prismaClient.farmaco.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(farmaco);
  }

  async updateFarmaco (request: Request, response: Response) {
    const { id } = request.params;
    const { nome } = request.body;
    const updateFarmaco = await prismaClient.farmaco.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome
      },
    })
    return response.json(updateFarmaco);
  }

  async removeFarmaco (request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteFarmaco = await prismaClient.farmaco.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteFarmaco);
    } catch (error) {
      const message = "Registro está vinculado em outro dado"
      return response.status(200).json({ error: message });
    }

  }
}
