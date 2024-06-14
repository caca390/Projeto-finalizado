import { createClient } from "@supabase/supabase-js";
const link = "https://cwqehdjzwpfgfzicbtxh.supabase.co"
const chave = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3cWVoZGp6d3BmZ2Z6aWNidHhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgxNDM2MjQsImV4cCI6MjAzMzcxOTYyNH0.ZG22ff4HiUwU-MTwJvzoO9rSbgl_57AJhRRhTz9hDBw"
export const supabase = createClient(link, chave);