import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const supabase = await createClient()

// ambil all deck
export async function GET(){
    const { data, error } = await supabase.from("decks").select("*")

    if(error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )
    
    return NextResponse.json(
        {deck : data},
        {status: 201}
    )
}


// bikin deck
export async function POST(req: Request){
    const body = await req.json()
    const { user_id, name, description, is_public } = body

    const { data, error } = await supabase.from('decks').insert({
        user_id, name, description, is_public
    }).select().single()

    if ( error ) return NextResponse.json({
        error: error.message
    }, 
        {status: 400}
    )

    return NextResponse.json({
        deck: data
    }, 
        {status: 201}
    )
}