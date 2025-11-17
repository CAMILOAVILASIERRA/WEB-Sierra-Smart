import { supabase } from '@/integrations/supabase/client';

// Reuse the single typed Supabase client to avoid multiple GoTrueClient instances
// Cast to any where untyped usage is expected
export const supabaseUntyped = supabase as any;
