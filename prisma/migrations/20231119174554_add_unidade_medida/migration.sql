/*
  Warnings:

  - Added the required column `id_unidade_medida` to the `calculo_diluicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `calculo_diluicao` ADD COLUMN `id_unidade_medida` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `unidades_medida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_id_unidade_medida_fkey` FOREIGN KEY (`id_unidade_medida`) REFERENCES `unidades_medida`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
