/*
  Warnings:

  - You are about to alter the column `concentracao` on the `calculo_diluicao` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `calculo_diluicao` MODIFY `concentracao` DECIMAL(10, 2) NOT NULL;
