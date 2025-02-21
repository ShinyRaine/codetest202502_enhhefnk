CREATE TABLE "category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_category" (
	"courseId" varchar(255) NOT NULL,
	"categoryId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course" (
	"courseId" varchar(255) PRIMARY KEY NOT NULL,
	"courseName" text NOT NULL,
	"startDate" timestamp NOT NULL,
	"instituteId" integer NOT NULL,
	"deliveryId" integer,
	"languageId" integer,
	"locationId" integer
);
--> statement-breakpoint
CREATE TABLE "delivery" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "delivery_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institute" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "institute_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "language" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "language_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "location" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "location_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course_category" ADD CONSTRAINT "course_category_courseId_course_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."course"("courseId") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course_category" ADD CONSTRAINT "course_category_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_instituteId_institute_id_fk" FOREIGN KEY ("instituteId") REFERENCES "public"."institute"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_deliveryId_category_id_fk" FOREIGN KEY ("deliveryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_languageId_language_id_fk" FOREIGN KEY ("languageId") REFERENCES "public"."language"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_locationId_location_id_fk" FOREIGN KEY ("locationId") REFERENCES "public"."location"("id") ON DELETE no action ON UPDATE no action;