-- CreateTable
CREATE TABLE "Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "banCount" INTEGER NOT NULL DEFAULT 0,
    "description" TEXT,
    "logChannel" TEXT
);
