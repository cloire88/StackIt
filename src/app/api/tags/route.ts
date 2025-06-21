import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const supabase = await createClient()

export async function GET(){
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