import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  numeric,
  integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for Facilita Horas
export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Events table for Facilita Horas
export const events = pgTable("events", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  rating: numeric("rating").notNull().default("0"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("upcoming"), // upcoming, ongoing, completed
});

// User schemas
export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  password: true,
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export const signupSchema = z
  .object({
    email: z.string().email("Email inválido"),
    username: z
      .string()
      .min(3, "Nome de usuário deve ter pelo menos 3 caracteres"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

// Event schemas
export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  date: true,
  rating: true,
  imageUrl: true,
  category: true,
  status: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type SignupData = z.infer<typeof signupSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

// Event filters and search
export type EventFilters = {
  category?: string;
  status?: "upcoming" | "ongoing" | "completed";
  search?: string;
};
