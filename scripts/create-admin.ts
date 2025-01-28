import { db } from "../db";
import { users } from "../db/schema";
import bcrypt from "bcryptjs";

async function createAdmin() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin";
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(users).values({
      username,
      password: hashedPassword,
    });
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Failed to create admin user:", error);
  }
}

createAdmin();
