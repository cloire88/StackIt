import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const supabase = await createClient()

export async function PUT(req: Request, {params} : {params: {id:string}} ){
    const body = await req.json()
    const { front, back } = body

    const { data, error } = await supabase.from('cards')
        .update({ front, back, updated_at: new Date().toISOString})
        .eq('id', params.id)
    
    if(error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return NextResponse.json(
        {card : data},
        {status : 200}
    )
}

export async function DELETE(_:Request, { params } : { params : {id:string}}){
    const { error } = await supabase.from('cards').delete().eq('id', params.id)
    
    if ( error ) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return NextResponse.json(
        {success: true},
        {status: 200}
    )
}