-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema aulim
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema aulim
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `aulim` DEFAULT CHARACTER SET utf8 ;
USE `aulim` ;

-- -----------------------------------------------------
-- Table `aulim`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aulim`.`user` (
  `Index` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(10) NOT NULL,
  `userCode` CHAR(10) NOT NULL,
  `userName` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`Index`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aulim`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aulim`.`group` (
  `Index` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(10) NOT NULL,
  `groupName` VARCHAR(10) NOT NULL,
  `groupCode` CHAR(10) NOT NULL,
  PRIMARY KEY (`Index`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aulim`.`activity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aulim`.`activity` (
  `user` VARCHAR(60) NOT NULL,
  `classdate` INT NOT NULL,
  `start` INT NOT NULL,
  `long` INT NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`user`, `classdate`, `start`, `long`, `name`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `aulim`.`memo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `aulim`.`memo` (
  `Inndex` INT NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(10) NOT NULL,
  `wdate` DATE NOT NULL,
  `mdate` DATE NOT NULL,
  `context` TEXT NOT NULL,


  `classname` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Inndex`))
ENGINE = InnoDB;

CREATE TABLE `aulim`.`addactlist` (
  `idnew_table` INT NOT NULL,
  `actName` VARCHAR(45) NULL,
  `classdate` INT NULL,
  `start` INT NULL,
  `long` INT NULL,
  `alarm` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`idnew_table`));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
