-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('Todo', 'Doing', 'Done');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('Not_set', 'Low', 'Medium', 'High');

-- CreateTable
CREATE TABLE "Tasks" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "priority" "Priority" NOT NULL DEFAULT 'Not_set',
    "dueDate" TIMESTAMP(3),
    "status" "TaskStatus" NOT NULL DEFAULT 'Todo',

    CONSTRAINT "Tasks_pkey" PRIMARY KEY ("id")
);
