import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
    const supabase = await createClient()
    const { data, error } = await supabase.from('tags').select('*')

    if ( error ) return NextResponse.json(
        { error : error.message },
        { status : 400}
    )

    return NextResponse.json(
        { tag : data },
        { status : 200 }
    )
}

export async function POST(req : Request){
    const supabase = await createClient()
    const body = await req.json()
    const { name } = body

    const { data, error } = await supabase.from('tags').insert({
        name
    }).select().single()

    if ( error ) return NextResponse.json(
        { error : error.message },
        { status: 400}
    )

    return NextResponse.json(
        {tag : data},
        { status : 200}
    )
}