/*
  Warnings:

  - You are about to drop the column `youtubeVideoId` on the `Video` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "path" TEXT NOT NULL,
    "transcription" TEXT
);
INSERT INTO "new_Video" ("id", "name", "path", "transcription") SELECT "id", "name", "path", "transcription" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
