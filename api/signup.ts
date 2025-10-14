import type { VercelRequest, VercelResponse } from "@vercel/node";
import { db } from "../../shared/db";
import { users } from "../../shared/schema";
import { eq } from "drizzle-orm";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, username, password } = request.body;

    // Verifica se email já existe
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return response.status(400).json({ error: "Email já está em uso" });
    }

    // Cria usuário (em produção, hash a senha!)
    const [newUser] = await db
      .insert(users)
      .values({
        email,
        username,
        password, // ⚠️ EM PRODUÇÃO: Use bcrypt para hash!
      })
      .returning();

    response.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    response.status(500).json({ error: "Erro interno do servidor" });
  }
}
