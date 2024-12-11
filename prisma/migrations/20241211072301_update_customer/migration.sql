-- AlterTable
ALTER TABLE "Customer" ADD COLUMN "budget" TEXT;
ALTER TABLE "Customer" ADD COLUMN "previousExperience" TEXT;
ALTER TABLE "Customer" ADD COLUMN "reason" TEXT;
ALTER TABLE "Customer" ADD COLUMN "sessionType" TEXT;
ALTER TABLE "Customer" ADD COLUMN "therapistVibe" TEXT;
ALTER TABLE "Customer" ADD COLUMN "therapyApproach" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "sessionFormat" TEXT NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("customerId", "endTime", "id", "sessionFormat", "startTime") SELECT "customerId", "endTime", "id", "sessionFormat", "startTime" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
