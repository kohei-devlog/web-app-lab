import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bzeknlsdqpqxhqnttvpi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6ZWtubHNkcXBxeGhxbnR0dnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5MTk4ODgsImV4cCI6MjA4MTQ5NTg4OH0.geyMzJpQj2pMtPZyIOs4vBuPmBcuMKNLLweJXV_-SpA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
