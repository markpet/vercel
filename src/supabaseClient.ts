import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rhdqiefgszmbsxjxfmfo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoZHFpZWZnc3ptYnN4anhmbWZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwODQ1MTMsImV4cCI6MjA1ODY2MDUxM30.GtAmzEQmGfJjRGzq4kwfZ4KQh_t2Ruuab7H8hMaZPO8'

export const supabase = createClient(supabaseUrl, supabaseKey)
