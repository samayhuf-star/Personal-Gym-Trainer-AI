import { createClient } from '@supabase/supabase-js';

// Public (publishable) values: safe to ship in the browser.
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ajnygqqhjwubkbxfqivn.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_hba_CAzvdcBCfNikgB_Fqw_7Cp-F1Je';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'momentum-auth' },
});

export const SEND_OTP_URL = `${SUPABASE_URL}/functions/v1/momentum-send-otp`;
