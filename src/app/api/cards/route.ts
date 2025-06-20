import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

const supabase = await createClient()

export async function GET(){
    const { data, error } = await supabase.from('cards').select('*')

    if (error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return NextResponse.json(
        {cards: data},
        {status: 200}
    )
}

export async function POST(req: Request){
    const body = await req.json()
    const { deck_id, front, back, user_id } = body

    const { data, error }   = await supabase.from('cards').insert({
        deck_id, front, back, user_id
    }).select().single()

    if(error) return NextResponse.json(
        {error: error.message},
        {status: 400}
    )

    return NextResponse.json(
        {card: data},
        {status: 201}
    )
}