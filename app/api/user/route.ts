import { supabase } from '@/lib/supabase'

export async function GET() {
    const { data, error } = await supabase.auth.getUser();
    return new Response(JSON.stringify(data), { status: 200 });
}
