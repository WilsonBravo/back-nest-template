/*
  Warnings:

  - Added the required column `role` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."user_role" AS ENUM ('OPERADOR', 'DIRECTOR', 'ADMINISTRADOR');

-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "role" "public"."user_role" NOT NULL;
