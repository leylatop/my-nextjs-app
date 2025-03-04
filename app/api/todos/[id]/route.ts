import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from 'next/server';
// GET 请求：获取特定 id 的 todo
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id; // 获取动态参数 id
    const { data, error } = await supabase.from('todos').select('*').eq('id', id);
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return NextResponse.json(data);
}

// PUT 请求：更新特定 id 的 todo
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const body = await request.json(); // 获取请求体数据
    console.log(body)
    const { data, error } = await supabase.from('todos').update(body).eq('id', id);
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return NextResponse.json(data);
}

// DELETE 请求：删除特定 id 的 todo
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const { data, error } = await supabase.from('todos').delete().eq('id', id);
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
    return NextResponse.json(data);
}