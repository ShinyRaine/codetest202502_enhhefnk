import { integer, timestamp, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("category", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
export const instituteTable = pgTable("institute", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
export const deliveryTable = pgTable("delivery", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
export const languageTable = pgTable("language", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
export const locationTable = pgTable("location", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});


export const courseTable = pgTable("course", {
  courseId: varchar({ length: 255 }).primaryKey(),
  courseName: text().notNull(),
  startDate: timestamp().notNull(),
  instituteId: integer().references(() => instituteTable.id),
  deliveryId: integer().references(() => categoryTable.id),
  languageId: integer().references(() => languageTable.id),
  locationId: integer().references(() => locationTable.id),
  categoryId: integer().references(() => categoryTable.id),
});

export const searchTable = pgTable("search", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: text().notNull(),
});

export const savedCourseTable = pgTable("saved_course", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  courseId: varchar({ length: 255 }).references(() => courseTable.courseId),
});
