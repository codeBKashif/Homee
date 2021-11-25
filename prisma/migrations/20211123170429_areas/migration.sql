/*
  Warnings:

  - You are about to drop the column `cityId` on the `Apartment` table. All the data in the column will be lost.
  - You are about to drop the column `countryId` on the `Apartment` table. All the data in the column will be lost.
  - Added the required column `city` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Apartment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Apartment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rooms" INTEGER NOT NULL,
    "building" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "lat" TEXT NOT NULL,
    "long" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Apartment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Apartment" ("building", "createdAt", "id", "lat", "long", "rooms", "userId") SELECT "building", "createdAt", "id", "lat", "long", "rooms", "userId" FROM "Apartment";
DROP TABLE "Apartment";
ALTER TABLE "new_Apartment" RENAME TO "Apartment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
