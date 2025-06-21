import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

const supabase = await createClient()

// update deck
export async function PUT(req: Request, { params } : {params: {id:string}}){
    const body = await req.json()
    const { name, description, is_public } = body

    const { data, error} = await supabase.from('decks')
        .update({ name, description, is_public, updated_at: new Date().toISOString()})
        .eq('id',params.id).select().single()
    
    if(error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return NextResponse.json(
        {deck: data},
        {status: 200}
    )
}


// delete deck
export async function DELETE(_:Request, {params}:{params: {id:string}}){
    const {error} = await supabase.from('decks').delete().eq('id', params.id)
    
    if (error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return NextResponse.json(
        {success: true},
        {status: 200}
    )
}