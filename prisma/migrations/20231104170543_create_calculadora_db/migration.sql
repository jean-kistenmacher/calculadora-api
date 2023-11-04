-- CreateTable
CREATE TABLE `farmacos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `laboratorios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `marcas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `acessos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vias_administracao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_farmaco` INTEGER NOT NULL,
    `id_marca` INTEGER NOT NULL,
    `id_laboratorio` INTEGER NOT NULL,
    `apresentacao` VARCHAR(255) NOT NULL,
    `bolsa` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calculo_diluicao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_medicamento` INTEGER NOT NULL,
    `id_via` INTEGER NOT NULL,
    `id_acesso` INTEGER NOT NULL,
    `reconstituicao` TEXT NOT NULL,
    `diluicao` TEXT NOT NULL,
    `concentracao` DECIMAL(65, 30) NOT NULL,
    `estabilidade` VARCHAR(255) NOT NULL,
    `tempo_adm` VARCHAR(255) NOT NULL,
    `observacao` TEXT NOT NULL,
    `data_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `laboratorioId` INTEGER NULL,
    `marcaId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_id_farmaco_fkey` FOREIGN KEY (`id_farmaco`) REFERENCES `farmacos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_id_marca_fkey` FOREIGN KEY (`id_marca`) REFERENCES `marcas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicamentos` ADD CONSTRAINT `medicamentos_id_laboratorio_fkey` FOREIGN KEY (`id_laboratorio`) REFERENCES `laboratorios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_id_medicamento_fkey` FOREIGN KEY (`id_medicamento`) REFERENCES `medicamentos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_id_via_fkey` FOREIGN KEY (`id_via`) REFERENCES `vias_administracao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_id_acesso_fkey` FOREIGN KEY (`id_acesso`) REFERENCES `acessos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_laboratorioId_fkey` FOREIGN KEY (`laboratorioId`) REFERENCES `laboratorios`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calculo_diluicao` ADD CONSTRAINT `calculo_diluicao_marcaId_fkey` FOREIGN KEY (`marcaId`) REFERENCES `marcas`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
