/*
  Warnings:

  - You are about to drop the column `youtubeURL` on the `Video` table. All the data in the column will be lost.
  - Added the required column `youtubeVideoId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Video" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "youtubeVideoId" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "transcription" TEXT
);
INSERT INTO "new_Video" ("id", "name", "path", "transcription") SELECT "id", "name", "path", "transcription" FROM "Video";
DROP TABLE "Video";
ALTER TABLE "new_Video" RENAME TO "Video";
CREATE UNIQUE INDEX "Video_youtubeVideoId_key" ON "Video"("youtubeVideoId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
