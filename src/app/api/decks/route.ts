import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

// ambil all deck
export async function GET(request: Request){
    console.log("GET /api/decks - Fetching decks")
    
    const { searchParams } = new URL(request.url)
    const isPublic = searchParams.get('public')
    
    console.log("Query params:", { isPublic })
    
    const supabase = await createClient()
    
    let query = supabase.from("decks").select(`
        *,
        cards(count)
    `)
    
    if (isPublic === 'true') {
        console.log("Filtering for public decks only")
        query = query.eq('is_public', true)
    } else {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
            console.log("Filtering for user's own decks:", user.id)
            query = query.eq('user_id', user.id)
        } else {
            console.log("No authenticated user found")
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            )
        }
    }

    const { data, error } = await query

    if(error) {
        console.error("Error fetching decks:", error)
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }
    
    console.log("Successfully fetched decks:", data?.length || 0, "decks")
    
    const transformedData = data?.map(deck => ({
        ...deck,
        card_count: deck.cards?.[0]?.count || 0
    })) || []
    
    console.log("Transformed data with card counts:", transformedData)
    
    return NextResponse.json(
        {deck : transformedData},
        {status: 200}
    )
}


// bikin deck
export async function POST(req: Request){
    console.log("POST /api/decks - Creating new deck")
    
    const supabase = await createClient()
    const body = await req.json()
    const { name, description, is_public } = body

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        console.log("Authentication failed:", authError?.message || "No user found")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Creating deck with data:", { user_id: user.id, name, description, is_public })

    const { data, error } = await supabase.from('decks').insert({
        user_id: user.id, 
        name, 
        description, 
        is_public
    }).select().single()

    if ( error ) {
        console.error("Error creating deck:", error)
        return NextResponse.json({
            error: error.message
        }, 
            {status: 400}
        )
    }

    console.log("Successfully created deck:", data)
    
    return NextResponse.json({
        deck: data
    }, 
        {status: 201}
    )
}