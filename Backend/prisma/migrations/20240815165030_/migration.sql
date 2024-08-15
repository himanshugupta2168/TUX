-- AlterTable
ALTER TABLE "User" ADD COLUMN     "thumbnail" TEXT;

-- CreateTable
CREATE TABLE "_Favourites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Favourites_AB_unique" ON "_Favourites"("A", "B");

-- CreateIndex
CREATE INDEX "_Favourites_B_index" ON "_Favourites"("B");

-- AddForeignKey
ALTER TABLE "_Favourites" ADD CONSTRAINT "_Favourites_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Favourites" ADD CONSTRAINT "_Favourites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
