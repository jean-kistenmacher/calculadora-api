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
    const farmacos = await prismaClient.farmaco.findMany()
    return response.json(farmacos);
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
    const deleteFarmaco = await prismaClient.farmaco.delete({
      where: {
        id: parseInt(id),
      },
    })
    return response.json(deleteFarmaco);
  }
}
