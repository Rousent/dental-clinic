
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xmrcozfqcoigbngikljv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtcmNvemZxY29pZ2JuZ2lrbGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA4ODMwMDIsImV4cCI6MjAxNjQ1OTAwMn0.gBc7Dg8EXh9WpDEDQsEjpEcCVZdlQZgy37wVsf5DS7Y';

export const supabase = createClient(supabaseUrl, supabaseKey);
