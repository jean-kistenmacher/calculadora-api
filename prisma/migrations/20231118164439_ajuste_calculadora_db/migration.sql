/*
  Warnings:

  - You are about to drop the column `id_medicamento` on the `calculo_diluicao` table. All the data in the column will be lost.
  - You are about to drop the column `apresentacao` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `bolsa` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `id_farmaco` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `id_laboratorio` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the column `id_marca` on the `medicamentos` table. All the data in the column will be lost.
  - You are about to drop the `farmacos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_apresentacao` to the `calculo_diluicao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `medicamentos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `calculo_diluicao` DROP FOREIGN KEY `calculo_diluicao_id_medicamento_fkey`;

-- DropForeignKey
ALTER TABLE `medicamentos` DROP FOREIGN KEY `medicamentos_id_farmaco_fkey`;

-- DropForeignKey
ALTER TABLE `medicamentos` DROP FOREIGN KEY `medicamentos_id_laboratorio_fkey`;

-- DropForeignKey
ALTER TABLE `medicamentos` DROP FOREIGN KEY `medicamentos_id_marca_fkey`;

-- AlterTable
ALTER TABLE `calculo_diluicao` DROP COLUMN `id_medicamento`,
    ADD COLUMN `id_apresentacao` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `medicamentos` DROP COLUMN `apresentacao`,
    DROP COLUMN `bolsa`,
    DROP COLUMN `id_farmaco`,
    DROP COLUMN `id_laboratorio`,
    DROP COLUMN `id_marca`,
    ADD COLUMN `nome` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `farmacos`;

-- CreateTable
CREATE TABLE `apresentacoes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_medicamento` INTEGER NOT NULL,
    `id_marca` INTEGER NOT NULL,
    `id_laboratorio` INTEGER NOT NULL,
    `apresentacao` VARCHAR(255) NOT NULL,
    `bolsa` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `apresentacoes` ADD CONSTRAINT `apresentacoes_id_medicamento_fkey` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apresentacoes` ADD CONSTRAINT `apresentacoes_id_marca_fkey` FOREIGN KEY (`id_marca`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `apresentacoes` ADD CONSTRAINT `apresentacoes_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `laboratorios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_id_apresentacao_fkey` FOREIGN KEY (`id_apresentacao`) REFERENCES `apresentacoes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
