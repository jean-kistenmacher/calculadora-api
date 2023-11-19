import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class MedicamentoController {

  async createMedicamento (request: Request, response: Response) {
    const { nome } = request.body;

    const medicamento = await prismaClient.medicamento.create({
      data: {
        nome
      }
    })

    return response.json(medicamento);
  }

  async getMedicamentos (request: Request, response: Response) {
    const pageSize = 5;
    let search = "";
    const { page } = request.query;
    if (request.query.search) {
      search = request.query.search as string;
    }
    const skip = (Number(page) - 1) * pageSize;
    const totalCount = await prismaClient.medicamento.count({
      where: {
        nome: {
          startsWith: search
        }
      },
    });
    const medicamentos = await prismaClient.medicamento.findMany({
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
    return response.json({ medicamentos, totalPages });
  }

  async getAllMedicamentos (request: Request, response: Response) {
    const medicamentos = await prismaClient.medicamento.findMany({ orderBy: { nome: 'asc' } });
    return response.json(medicamentos);
  }

  async getMedicamentosById (request: Request, response: Response) {
    const { id } = request.params;
    const medicamento = await prismaClient.medicamento.findUnique({
      where: {
        id: parseInt(id)
      },
    })
    return response.json(medicamento);
  }

  async updateMedicamento (request: Request, response: Response) {
    const { id } = request.params;
    const { nome } = request.body;
    const updateMedicamento = await prismaClient.medicamento.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nome
      },
    })
    return response.json(updateMedicamento);
  }

  async removeMedicamento (request: Request, response: Response) {
    const { id } = request.params;
    try {
      const deleteMedicamento = await prismaClient.medicamento.delete({
        where: {
          id: parseInt(id),
        },
      })
      return response.json(deleteMedicamento);
    } catch (error) {
      const message = "Registro está vinculado em outro dado"
      return response.status(200).json({ error: message });
    }
  }
}
