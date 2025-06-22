import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const supabase = await createClient()
    const body = await req.json()
    const { deck_id, tag_id } = body
    
    const { data, error } = await supabase.from('deck_tags').insert(
        {deck_id, tag_id}
    ).select().single()

    if ( error ) return NextResponse.json(
        { error: error.message},
        { status: 400}
    )

    return NextResponse.json(
        { deck_tags: data},
        { status: 201 }
    )
}

export async function DELETE( _:Request, { params } : { params : { deck_id:string, tag_id : string }}){
    const supabase = await createClient()
    const {deck_id, tag_id} = await params
    const { error } = await supabase.from('deck_tags').delete().match({deck_id, tag_id})

    if ( error ) return NextResponse.json(
        { error : error.message },
        { status : 400}
    )

    return NextResponse.json(
        { success : true},
        { status : 200}
    )
}