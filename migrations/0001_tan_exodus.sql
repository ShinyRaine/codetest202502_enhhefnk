ALTER TABLE "course_category" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "course_category" CASCADE;--> statement-breakpoint
ALTER TABLE "course" ADD COLUMN "categoryId" integer;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;