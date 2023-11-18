/*
  Warnings:

  - You are about to drop the column `apresentacao` on the `apresentacoes` table. All the data in the column will be lost.
  - Added the required column `qtd_apresentacao` to the `apresentacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `apresentacoes` DROP COLUMN `apresentacao`,
    ADD COLUMN `qtd_apresentacao` VARCHAR(255) NOT NULL;
