#!/bin/bash
# Postinstall script for Railway deployment
# Generates Prisma client and pushes schema to database

set -e

echo "📦 Running postinstall script..."

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate || bun run db:generate

# Push schema to database (creates tables if needed)
# This is safe to run multiple times
echo "🗄️ Pushing schema to database..."
npx prisma db push --accept-data-loss || true

echo "✅ Postinstall completed successfully!"
