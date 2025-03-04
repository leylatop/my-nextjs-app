import { supabase } from '@/lib/supabase'

export async function GET() {
    const { data, error } = await supabase.from('todos').select('*');
    console.log(data)
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request: Request) {
    const { task } = await request.json();
    const { data, error } = await supabase.from('todos').insert({ task });
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(request: Request) {
    const { id, completed } = await request.json();
    const { data, error } = await supabase.from('todos').update({ completed }).eq('id', id);
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const { data, error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return new Response(JSON.stringify(data), { status: 200 });
}