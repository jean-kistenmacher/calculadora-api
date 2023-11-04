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
    const acessos = await prismaClient.acesso.findMany()
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
    const deleteAcesso = await prismaClient.acesso.delete({
      where: {
        id: parseInt(id),
      },
    })
    return response.json(deleteAcesso);
  }

}
