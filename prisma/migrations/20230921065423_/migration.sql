/*
  Warnings:

  - You are about to drop the `Discard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `seatPosition` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `turnPhase` on the `Turn` table. All the data in the column will be lost.
  - Added the required column `displayName` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Discard";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HandCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    CONSTRAINT "HandCard_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DeckCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "DeckCard_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "playerId" TEXT,
    "type" TEXT NOT NULL,
    CONSTRAINT "Action_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DiscardCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originPosition" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    CONSTRAINT "DiscardCard_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Player_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("id", "matchId", "userId") SELECT "id", "matchId", "userId" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    "actionId" TEXT,
    CONSTRAINT "Card_actionId_fkey" FOREIGN KEY ("actionId") REFERENCES "Action" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("cardType", "id", "value") SELECT "cardType", "id", "value" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "occupantId" TEXT NOT NULL,
    "cardCount" INTEGER NOT NULL DEFAULT 0,
    "position" TEXT NOT NULL,
    "tableId" TEXT,
    CONSTRAINT "Seat_occupantId_fkey" FOREIGN KEY ("occupantId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seat_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("cardCount", "id", "occupantId", "tableId") SELECT "cardCount", "id", "occupantId", "tableId" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE UNIQUE INDEX "Seat_occupantId_key" ON "Seat"("occupantId");
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "turnId" TEXT,
    "stage" TEXT NOT NULL DEFAULT 'init',
    "startingPos" TEXT NOT NULL DEFAULT 'E',
    CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Round_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("id", "matchId", "turnId") SELECT "id", "matchId", "turnId" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE UNIQUE INDEX "Round_matchId_key" ON "Round"("matchId");
CREATE TABLE "new_Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "deckCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Table_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Table" ("id", "matchId") SELECT "id", "matchId" FROM "Table";
DROP TABLE "Table";
ALTER TABLE "new_Table" RENAME TO "Table";
CREATE UNIQUE INDEX "Table_matchId_key" ON "Table"("matchId");
CREATE TABLE "new_Turn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatId" TEXT NOT NULL,
    "phase" TEXT NOT NULL DEFAULT 'draw',
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "timeLimit" INTEGER NOT NULL,
    CONSTRAINT "Turn_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Turn" ("endTime", "id", "seatId", "startTime", "timeLimit") SELECT "endTime", "id", "seatId", "startTime", "timeLimit" FROM "Turn";
DROP TABLE "Turn";
ALTER TABLE "new_Turn" RENAME TO "Turn";
CREATE UNIQUE INDEX "Turn_seatId_key" ON "Turn"("seatId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Action_matchId_key" ON "Action"("matchId");
