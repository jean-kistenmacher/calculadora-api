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
    const laboratorios = await prismaClient.laboratorio.findMany()
    return response.json(laboratorios);
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
