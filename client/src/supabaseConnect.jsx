import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://lulfbwiluepkywyznarx.supabase.co",
  import.meta.env.VITE_SECRET_KEY
);
