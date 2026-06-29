/**
 * Futura implementação do backend do FacilitaHoras.
 * Atualmente a aplicação utiliza LocalStorage.
 */

import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  varchar,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  email: text("email").notNull().unique(),

  username: text("username").notNull(),

  password: text("password").notNull(),

  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: text("title").notNull(),

  description: text("description"),

  location: text("location").notNull(),

  category: text("category").notNull(),

  group: text("group").notNull(),

  date: timestamp("date").notNull(),

  status: text("status").notNull().default("upcoming"),

  points: numeric("points").notNull(),

  maxPoints: numeric("max_points"),

  unit: text("unit"),
});

export const activities = pgTable("activities", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: text("title").notNull(),

  group: text("group").notNull(),

  category: text("category").notNull(),

  description: text("description"),

  quantity: numeric("quantity"),

  points: numeric("points").notNull(),

  maxPoints: numeric("max_points"),

  unit: text("unit"),

  activityDate: timestamp("activity_date").notNull(),

  certificate: text("certificate"),

  status: text("status").notNull().default("registered"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  title: true,
  group: true,
  category: true,
  description: true,
  quantity: true,
  points: true,
  maxPoints: true,
  unit: true,
  activityDate: true,
  certificate: true,
  status: true,
});

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

    role: z.enum(["student", "teacher"], {
      message: "Selecione o tipo de usuário",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  category: true,
  group: true,
  date: true,
  status: true,
  points: true,
  maxPoints: true,
  unit: true,
});

export type Activity = typeof activities.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type User = typeof users.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;

export type LoginData = z.infer<typeof loginSchema>;

export type SignupData = z.infer<typeof signupSchema>;

export type Event = typeof events.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;

export type EventFilters = {
  category?: string;
  status?: "upcoming" | "ongoing" | "completed";
  search?: string;
};
