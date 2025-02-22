CREATE TABLE "saved_course" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "saved_course_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" varchar(255)
);
--> statement-breakpoint
CREATE TABLE "search" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "search_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "saved_course" ADD CONSTRAINT "saved_course_courseId_course_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."course"("courseId") ON DELETE no action ON UPDATE no action;