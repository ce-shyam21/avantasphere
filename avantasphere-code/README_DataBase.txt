E:\Personal_Projects_new\avantasphere>cd avantasphere-code

E:\Personal_Projects_new\avantasphere\avantasphere-code>npm install @prisma/client @supabase/supabase-js

added 12 packages, and audited 456 packages in 31s

143 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

E:\Personal_Projects_new\avantasphere\avantasphere-code>npm install -D prisma

added 78 packages, and audited 534 packages in 47s

154 packages are looking for funding
  run `npm fund` for details

3 high severity vulnerabilities

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

E:\Personal_Projects_new\avantasphere\avantasphere-code>npx prisma init

Initialized Prisma in your project

  prisma/
    schema.prisma
  prisma.config.ts

warn Prisma would have added DATABASE_URL but it already exists in .env.
warn You already have a .gitignore file. Don't forget to add .env in it to not commit any private information.

Next, choose how you want to set up your database:

CONNECT EXISTING DATABASE:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.

CREATE NEW DATABASE:
  Local: npx prisma dev (runs Postgres locally in your terminal)
  Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.

Learn more: https://pris.ly/getting-started






# For Local Development (Optional - See Step 2 if using local Postgres)
# DATABASE_URL_LOCAL="postgresql://postgres:password@localhost:5432/avantasphere_local"

# SUPABASE API
NEXT_PUBLIC_SUPABASE_URL=https://mbalvfcbyufwsvoukhgx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1iYWx2ZmNieXVmd3N2b3VraGd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MTYzNzksImV4cCI6MjA4MzI5MjM3OX0.Bf5g_NnVSJitbsccea_SWQBrfCuRY11KFxoefkOUvRM


DATABASE_URL_POOL="postgresql://postgres:admin%40123%40200486@mbalvfcbyufwsvoukhgx-pooler.supabase.co:6543/postgres"