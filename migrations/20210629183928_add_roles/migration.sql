-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "canManageContent" BOOLEAN,
    "canManageUsers" BOOLEAN,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "User.role_index" ON "User"("role");

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;
