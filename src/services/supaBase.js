import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://krwqxkvndsbvydigcaxd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtyd3F4a3ZuZHNidnlkaWdjYXhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNzk4OTgsImV4cCI6MjA2NTY1NTg5OH0.vWBEjABWzfcG0alL6xb1S1r74GiHoPbOc0Y2_KXNm84'

export const supabase = createClient(supabaseUrl, supabaseKey)