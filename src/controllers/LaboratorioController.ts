import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class LaboratorioController {

  async createLaboratorio (request: Request, response: Response) {
    try {
      const { nome } = request.body;
      const laboratorio = await prismaClient.laboratorio.create({
        data: {
          nome
        }
      })

      return response.json(laboratorio);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getAllLaboratorios (request: Request, response: Response) {
    try {
      const laboratorios = await prismaClient.laboratorio.findMany({ orderBy: { nome: 'asc' } });
      return response.json(laboratorios);
    } catch (error) {
      return response.status(400).json(error);
    }
  }


  async getLaboratorios (request: Request, response: Response) {
    try {
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
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async getLaboratorioById (request: Request, response: Response) {
    try {
      const { id } = request.params;
      const laboratorio = await prismaClient.laboratorio.findUnique({
        where: {
          id: parseInt(id)
        },
      })
      return response.json(laboratorio);
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async updateLaboratorio (request: Request, response: Response) {
    try {
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
    } catch (error) {
      return response.status(400).json(error);
    }
  }

  async removeLaboratorio (request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteLaboratorio = await prismaClient.laboratorio.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteLaboratorio);
    } catch (error) {
      const message = "Registro está vinculado em outro dado"
      return response.status(200).json({ error: message });
    }
  }

}
