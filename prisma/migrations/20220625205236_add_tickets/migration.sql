-- CreateTable
CREATE TABLE "TicketModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "deadline" DATETIME NOT NULL,
    "assigneeId" INTEGER NOT NULL,
    CONSTRAINT "TicketModel_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
