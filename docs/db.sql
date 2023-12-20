-- Adminer 4.8.1 PostgreSQL 10.22 dump

DROP TABLE IF EXISTS "posts";
DROP SEQUENCE IF EXISTS posts_post_id_seq;
CREATE SEQUENCE posts_post_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."posts" (
    "post_id" integer DEFAULT nextval('posts_post_id_seq') NOT NULL,
    "post_topic" integer NOT NULL,
    "post_content" text,
    "add_time" timestamp(0),
    "created_by" integer NOT NULL,
    CONSTRAINT "posts_pkey" PRIMARY KEY ("post_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "topics";
DROP SEQUENCE IF EXISTS topics_topic_id_seq;
CREATE SEQUENCE topics_topic_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."topics" (
    "topic_id" integer DEFAULT nextval('topics_topic_id_seq') NOT NULL,
    "topic_subject" text,
    "add_time" timestamp(0),
    "created_by" integer NOT NULL,
    "topic_content" text,
    "topic_status" integer,
    CONSTRAINT "topics_pkey" PRIMARY KEY ("topic_id")
) WITH (oids = false);


DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_user_id_seq;
CREATE SEQUENCE users_user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "user_id" integer DEFAULT nextval('users_user_id_seq') NOT NULL,
    "user_name" character varying(30),
    "user_pass" character varying(256),
    "reg_time" timestamp(0),
    "user_level" integer NOT NULL,
    "user_status" integer,
    CONSTRAINT "user_name_unique" UNIQUE ("user_name"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
) WITH (oids = false);


ALTER TABLE ONLY "public"."posts" ADD CONSTRAINT "posts_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."posts" ADD CONSTRAINT "posts_post_topic_fkey" FOREIGN KEY (post_topic) REFERENCES topics(topic_id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

ALTER TABLE ONLY "public"."topics" ADD CONSTRAINT "topics_created_by_fkey" FOREIGN KEY (created_by) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;
ALTER TABLE ONLY "public"."topics" ADD CONSTRAINT "topics_created_by_fkey1" FOREIGN KEY (created_by) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE RESTRICT NOT DEFERRABLE;

-- 2023-12-20 04:46:14.681016+03
