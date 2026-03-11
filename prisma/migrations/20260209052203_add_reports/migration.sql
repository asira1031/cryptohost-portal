-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "reference" TEXT NOT NULL,
    "senderName" TEXT,
    "senderEmail" TEXT,
    "declaredAmt" TEXT,
    "currency" TEXT,
    "network" TEXT,
    "token" TEXT,
    "txHash" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ON_HOLD',
    "fileName" TEXT,
    "filePath" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_reference_key" ON "Report"("reference");
