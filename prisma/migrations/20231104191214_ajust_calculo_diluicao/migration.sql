/*
  Warnings:

  - You are about to drop the column `laboratorioId` on the `calculo_diluicao` table. All the data in the column will be lost.
  - You are about to drop the column `marcaId` on the `calculo_diluicao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `calculo_diluicao` DROP FOREIGN KEY `calculo_diluicao_laboratorioId_fkey`;

-- DropForeignKey
ALTER TABLE `calculo_diluicao` DROP FOREIGN KEY `calculo_diluicao_marcaId_fkey`;

-- AlterTable
ALTER TABLE `calculo_diluicao` DROP COLUMN `laboratorioId`,
    DROP COLUMN `marcaId`;
