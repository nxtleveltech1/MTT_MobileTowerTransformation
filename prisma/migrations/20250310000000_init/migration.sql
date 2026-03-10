-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "clerk_user_id" TEXT NOT NULL,
    "display_name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'viewer',
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "towers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "technology" TEXT NOT NULL,
    "lat" DECIMAL(10,6),
    "lng" DECIMAL(10,6),
    "prb_usage" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "towers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tower_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tower_id" UUID NOT NULL,
    "users_count" INTEGER NOT NULL DEFAULT 0,
    "throughput_gbps" DECIMAL(10,4) NOT NULL DEFAULT 0,
    "recorded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tower_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alerts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tower_id" UUID,
    "severity" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "profiles_clerk_user_id_key" ON "profiles"("clerk_user_id");

-- CreateIndex
CREATE INDEX "profiles_clerk_user_id_idx" ON "profiles"("clerk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "towers_code_key" ON "towers"("code");

-- CreateIndex
CREATE INDEX "tower_metrics_tower_id_recorded_at_idx" ON "tower_metrics"("tower_id", "recorded_at" DESC);

-- CreateIndex
CREATE INDEX "alerts_tower_id_created_at_idx" ON "alerts"("tower_id", "created_at" DESC);

-- AddForeignKey
ALTER TABLE "tower_metrics" ADD CONSTRAINT "tower_metrics_tower_id_fkey" FOREIGN KEY ("tower_id") REFERENCES "towers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alerts" ADD CONSTRAINT "alerts_tower_id_fkey" FOREIGN KEY ("tower_id") REFERENCES "towers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
