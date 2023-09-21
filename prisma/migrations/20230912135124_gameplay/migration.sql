-- CreateTable
CREATE TABLE "Table" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matchId" TEXT NOT NULL,
    "currentRound" INTEGER NOT NULL,
    CONSTRAINT "Table_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Turn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "seatId" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "Turn_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Turn_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "Deck_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Discards" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "Discards_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "value" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "deckId" TEXT,
    "seatId" TEXT,
    "discardsId" TEXT,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_discardsId_fkey" FOREIGN KEY ("discardsId") REFERENCES "Discards" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "Seat" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Seat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "position" TEXT NOT NULL,
    "occupantId" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "tableId" TEXT NOT NULL,
    CONSTRAINT "Seat_occupantId_fkey" FOREIGN KEY ("occupantId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Seat_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Table_matchId_key" ON "Table"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Turn_seatId_key" ON "Turn"("seatId");

-- CreateIndex
CREATE UNIQUE INDEX "Turn_tableId_key" ON "Turn"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "Deck_tableId_key" ON "Deck"("tableId");

-- CreateIndex
CREATE UNIQUE INDEX "Discards_tableId_key" ON "Discards"("tableId");
