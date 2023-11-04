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

    return response.json();
  }

  async getMarcas (request: Request, response: Response) {
    const marcas = await prismaClient.marca.findMany()
    return response.json(marcas);
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
