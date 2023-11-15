import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export class MedicamentoController {

  async createMedicamento (request: Request, response: Response) {
    const { apresentacao, bolsa, idFarmaco, idLaboratorio, idMarca } = request.body;

    const medicamento = await prismaClient.medicamento.create({
      data: {
        apresentacao: apresentacao,
        bolsa: bolsa,
        id_farmaco: idFarmaco,
        id_laboratorio: idLaboratorio,
        id_marca: idMarca,
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
      // where: {
      //   nome: {
      //     startsWith: search
      //   }
      // },
    });
    const medicamentos = await prismaClient.medicamento.findMany({
      skip,
      take: pageSize,
      // where: {
      //   nome: {
      //     startsWith: search
      //   }
      // },
      // orderBy: {
      //   nome: 'asc'
      // },
    })
    const totalPages = Math.ceil(totalCount / pageSize);
    return response.json({ medicamentos, totalPages });
  }

  async getMedicamentoById (request: Request, response: Response) {
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
    const { apresentacao, bolsa, idFarmaco, idLaboratorio, idMarca } = request.body;
    const updateMedicamento = await prismaClient.medicamento.update({
      where: {
        id: parseInt(id),
      },
      data: {
        apresentacao: apresentacao,
        bolsa: bolsa,
        id_farmaco: idFarmaco,
        id_laboratorio: idLaboratorio,
        id_marca: idMarca,
      }
    })
    return response.json(updateMedicamento);
  }


  async removeMedicamento (request: Request, response: Response) {
    const { id } = request.params;
    const deleteMedicamento = await prismaClient.medicamento.delete({
      where: {
        id: parseInt(id),
      },
    })
    return response.json(deleteMedicamento);
  }

}
