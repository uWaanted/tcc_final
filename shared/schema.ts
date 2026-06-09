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

// ==================== USERS ====================

export const users = pgTable("users", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  email: text("email").notNull().unique(),

  username: text("username").notNull(),

  password: text("password").notNull(),

  role: varchar("role", { length: 20 }).notNull(),

  phone: varchar("phone", { length: 20 }),

  profileImage: text("profile_image"),

  createdAt: timestamp("created_at").defaultNow(),
});

// ==================== EVENTS ====================

export const events = pgTable("events", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: text("title").notNull(),

  description: text("description").notNull(),

  location: text("location").notNull(),

  date: timestamp("date").notNull(),

  hours: numeric("hours").notNull(),

  imageUrl: text("image_url").notNull(),

  category: text("category").notNull(),

  status: text("status").notNull().default("upcoming"),

  createdBy: varchar("created_by", { length: 255 }).notNull(),
});

// ==================== EVENT PARTICIPANTS ====================

export const eventParticipants = pgTable("event_participants", {
  id: varchar("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  userId: varchar("user_id").notNull(),

  eventId: varchar("event_id").notNull(),

  certificateUrl: text("certificate_url"),

  status: text("status").notNull().default("pending"),

  feedback: text("feedback"),

  submittedAt: timestamp("submitted_at"),

  reviewedAt: timestamp("reviewed_at"),
});


export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  username: true,
  password: true,
  role: true,
  phone: true,
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

    phone: z.string().optional(),

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

// ==================== EVENT SCHEMAS ====================

export const insertEventSchema = createInsertSchema(events).pick({
  title: true,
  description: true,
  location: true,
  date: true,
  hours: true,
  imageUrl: true,
  category: true,
  status: true,
  createdBy: true,
});



export type User = typeof users.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;

export type LoginData = z.infer<typeof loginSchema>;

export type SignupData = z.infer<typeof signupSchema>;

export type Event = typeof events.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;

export type EventParticipant = typeof eventParticipants.$inferSelect;

export type InsertEventParticipant = z.infer<
  typeof insertEventParticipantSchema
>;

// ==================== FILTERS ====================

export type EventFilters = {
  category?: string;
  status?: "upcoming" | "ongoing" | "completed";
  search?: string;
};
