-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Registration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "registrantId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    CONSTRAINT "Registration_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Registration_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Registration" ("id", "matchId", "registrantId") SELECT "id", "matchId", "registrantId" FROM "Registration";
DROP TABLE "Registration";
ALTER TABLE "new_Registration" RENAME TO "Registration";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
