// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  replace these with your own values
const supabaseUrl = "https://ockqjzzboidyxbzolket.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ja3Fqenpib2lkeXhiem9sa2V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MTQ2MjgsImV4cCI6MjA3MjI5MDYyOH0.5Kl4MveT-lBqElvOX5G-w249MNBA7xgBsRVljesan48"; // Replace with yours

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
