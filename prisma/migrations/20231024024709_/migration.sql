/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Table` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `tableId` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `displayName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `matchId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `DiscardCard` table. All the data in the column will be lost.
  - You are about to drop the column `tableId` on the `DeckCard` table. All the data in the column will be lost.
  - You are about to drop the column `stage` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `turnId` on the `Round` table. All the data in the column will be lost.
  - You are about to drop the column `phase` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `seatId` on the `Turn` table. All the data in the column will be lost.
  - You are about to drop the column `rounds` on the `Match` table. All the data in the column will be lost.
  - You are about to drop the column `stage` on the `Match` table. All the data in the column will be lost.
  - Added the required column `matchId` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nametag` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turnId` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundId` to the `DiscardCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundId` to the `DeckCard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `atPlayerId` to the `Turn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundId` to the `Turn` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundsCount` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Table_matchId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Table";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "registrantName" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "playerId" TEXT NOT NULL,
    CONSTRAINT "Registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Registration_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Registration_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nametag" TEXT NOT NULL,
    "cardCount" INTEGER NOT NULL DEFAULT 0,
    "position" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "occupantId" TEXT,
    "totalScore" INTEGER NOT NULL DEFAULT 0,
    "lastScore" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Seat_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seat" ("cardCount", "id", "occupantId", "position") SELECT "cardCount", "id", "occupantId", "position" FROM "Seat";
DROP TABLE "Seat";
ALTER TABLE "new_Seat" RENAME TO "Seat";
CREATE TABLE "new_Action" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "playerId" TEXT,
    "type" TEXT NOT NULL,
    "turnId" TEXT NOT NULL,
    CONSTRAINT "Action_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Action_turnId_fkey" FOREIGN KEY ("turnId") REFERENCES "Turn" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Action" ("id", "playerId", "type") SELECT "id", "playerId", "type" FROM "Action";
DROP TABLE "Action";
ALTER TABLE "new_Action" RENAME TO "Action";
CREATE TABLE "new_Player" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatId" TEXT,
    "registrationId" TEXT,
    CONSTRAINT "Player_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Player" ("id") SELECT "id" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
CREATE UNIQUE INDEX "Player_seatId_key" ON "Player"("seatId");
CREATE TABLE "new_DiscardCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originPosition" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    CONSTRAINT "DiscardCard_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DiscardCard" ("cardType", "id", "originPosition", "value") SELECT "cardType", "id", "originPosition", "value" FROM "DiscardCard";
DROP TABLE "DiscardCard";
ALTER TABLE "new_DiscardCard" RENAME TO "DiscardCard";
CREATE TABLE "new_DeckCard" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "cardType" TEXT NOT NULL,
    "roundId" TEXT NOT NULL,
    CONSTRAINT "DeckCard_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DeckCard" ("cardType", "id", "value") SELECT "cardType", "id", "value" FROM "DeckCard";
DROP TABLE "DeckCard";
ALTER TABLE "new_DeckCard" RENAME TO "DeckCard";
CREATE TABLE "new_Round" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "startingPos" TEXT NOT NULL DEFAULT 'E',
    "deckCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Round_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Round" ("id", "matchId", "startingPos") SELECT "id", "matchId", "startingPos" FROM "Round";
DROP TABLE "Round";
ALTER TABLE "new_Round" RENAME TO "Round";
CREATE UNIQUE INDEX "Round_matchId_key" ON "Round"("matchId");
CREATE TABLE "new_Turn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "atPlayerId" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" DATETIME,
    "roundId" TEXT NOT NULL,
    "timeLimit" INTEGER NOT NULL,
    CONSTRAINT "Turn_atPlayerId_fkey" FOREIGN KEY ("atPlayerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Turn_roundId_fkey" FOREIGN KEY ("roundId") REFERENCES "Round" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Turn" ("endTime", "id", "startTime", "timeLimit") SELECT "endTime", "id", "startTime", "timeLimit" FROM "Turn";
DROP TABLE "Turn";
ALTER TABLE "new_Turn" RENAME TO "Turn";
CREATE UNIQUE INDEX "Turn_atPlayerId_key" ON "Turn"("atPlayerId");
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatLimit" INTEGER NOT NULL,
    "roundsCount" INTEGER NOT NULL,
    "roundIdx" INTEGER NOT NULL DEFAULT -1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startTime" DATETIME,
    "updatedAt" DATETIME NOT NULL,
    "endTime" DATETIME
);
INSERT INTO "new_Match" ("endTime", "id", "seatLimit", "startTime", "updatedAt") SELECT "endTime", "id", "seatLimit", "startTime", "updatedAt" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Registration_playerId_key" ON "Registration"("playerId");
