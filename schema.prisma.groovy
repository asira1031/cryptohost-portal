generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}



enum UserRole {
  SENDER
  ADMIN
}

enum UserStatus {
  PENDING
  ACTIVE
  DISABLED
}

enum FileStatus {
  RECEIVED
  UNDER_VALIDATION
  QUEUED
  ON_HOLD_COMPLIANCE
  AWAITING_BANK_RELEASE
  COMPLETED
  CLOSED
}

enum UpdateVisibility {
  CLIENT
  INTERNAL
}

model User {
  id           String     @id @default(cuid())
  email        String     @unique
  passwordHash String
  fullName     String
  role         UserRole   @default(SENDER)
  status       UserStatus @default(PENDING)
  refCode      String?
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  files        File[]
  updatesMade  FileUpdate[] @relation("UpdatesMade")
}

model File {
  id           String     @id @default(cuid())
  userId       String
  owner        User       @relation(fields: [userId], references: [id])
  fileRef      String     @unique
  title        String?
  status       FileStatus @default(RECEIVED)
  lastUpdateAt DateTime   @default(now())
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt

  updates      FileUpdate[]
}

model FileUpdate {
  id         String           @id @default(cuid())
  fileId     String
  file       File             @relation(fields: [fileId], references: [id])

  postedById String?
  postedBy   User?            @relation("UpdatesMade", fields: [postedById], references: [id])

  message    String
  visibility UpdateVisibility @default(CLIENT)

  createdAt  DateTime         @default(now())
}
