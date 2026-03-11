import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "asiracryptohost@adminjanspay.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMeNow123!";
  const fullName = process.env.ADMIN_NAME || "CryptoHost Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log("Admin already exists:", email);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { email, passwordHash, fullName, role: "ADMIN", status: "ACTIVE" },
  });

  console.log("Admin created:", email);
}

main().finally(async () => prisma.$disconnect());
