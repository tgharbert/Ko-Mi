-- CreateTable
CREATE TABLE "ReportedURL" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "addressed" BOOLEAN NOT NULL,

    CONSTRAINT "ReportedURL_pkey" PRIMARY KEY ("id")
);
