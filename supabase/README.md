# Supabase Migrations

This project uses Supabase SQL migrations for the database schema.

## Apply migrations (Supabase CLI)

```bash
supabase start
supabase db reset
```

## Apply migrations (manual)

1. Open the Supabase SQL editor for your project.
2. Run the SQL in `supabase/migrations/*.sql` in order.

## Notes

- Tables reference `auth.users` for user ownership.
- RLS is enabled with minimal policies for MVP safety.
