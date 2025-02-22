CREATE TABLE "applyed_course" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "applyed_course_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"courseId" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "applyed_course" ADD CONSTRAINT "applyed_course_courseId_course_courseId_fk" FOREIGN KEY ("courseId") REFERENCES "public"."course"("courseId") ON DELETE no action ON UPDATE no action;