import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server";

const supabase = await createClient()

export async function POST(req: Request){
    const body = await req.json()
    const {user_id, card_id, last_reviewed, interval, ease_factor, repetition, next_review} = body;

    const { data, error } = await supabase.from('user_card_progress').upsert(
        {user_id, card_id, last_reviewed, interval, ease_factor, repetition, next_review},
        { onConflict: 'user_id, card_id' }
    )

    if ( error ) return NextResponse.json(
        { error : error.message },
        { status : 400}
    )

    return NextResponse.json(
        { data : data },
        { status : 201 }
    )
}