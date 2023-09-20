/*
  Warnings:

  - You are about to drop the `Deck` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Discards` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_MatchToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `seats` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `currentRound` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `phase` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `totalScore` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `deckId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `discardsId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `seatId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Card` table. All the data in the column will be lost.
  - Added the required column `seatLimit` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeLimit` to the `Turn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cardType` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tableId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Deck_tableId_key";

-- DropIndex
DROP INDEX "Discards_tableId_key";

-- DropIndex
DROP INDEX "_MatchToUser_B_index";

-- DropIndex
DROP INDEX "_MatchToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Deck";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Discards";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_MatchToUser";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "turnId" TEXT NOT NULL,
    CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Round_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "seatPosition" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Player_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Discard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatId" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    CONSTRAINT "Discard_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Discard_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatLimit" INTEGER NOT NULL,
    "rounds" INTEGER NOT NULL,
    "stage" TEXT NOT NULL DEFAULT 'pre',
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "endTime" DATETIME
);
INSERT INTO "new_Match" ("id", "rounds", "stage", "updatedAt") SELECT "id", "rounds", "stage", "updatedAt" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    CONSTRAINT "Table_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("id", "matchId") SELECT "id", "matchId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE UNIQUE INDEX "Table_matchId_key" ON "Table"("matchId");
CREATE TABLE "new_Turn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatId" TEXT NOT NULL,
    "turnPhase" TEXT NOT NULL DEFAULT 'draw',
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "timeLimit" INTEGER NOT NULL,
    CONSTRAINT "Turn_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Turn" ("id", "seatId") SELECT "id", "seatId" FROM "Turn";
DROP TABLE "Turn";
ALTER TABLE "new_Turn" RENAME TO "Turn";
CREATE UNIQUE INDEX "Turn_seatId_key" ON "Turn"("seatId");
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "occupantId" TEXT NOT NULL,
    "cardCount" INTEGER NOT NULL DEFAULT 0,
    "tableId" TEXT,
    "playerId" TEXT,
    "userId" TEXT,
    CONSTRAINT "Seat_occupantId_fkey" FOREIGN KEY ("occupantId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seat_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Seat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("id", "occupantId", "tableId") SELECT "id", "occupantId", "tableId" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE UNIQUE INDEX "Seat_occupantId_key" ON "Seat"("occupantId");
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "Card_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("id", "value") SELECT "id", "value" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Round_matchId_key" ON "Round"("matchId");
