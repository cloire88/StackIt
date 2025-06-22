import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server"

// get deck by id
export async function GET(_: Request, { params }: { params: { id: string } }) {
  console.log("GET /api/decks/[id] - Fetching deck by ID")
  
  const supabase = await createClient()
  const { id } = await params

  console.log("Fetching deck with ID:", id)

  const { data, error } = await supabase
    .from('decks')
    .select(`
      *,
      cards(count)
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error("Error fetching deck:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    )
  }

  const transformedData = {
    ...data,
    card_count: data.cards?.[0]?.count || 0
  }

  console.log("Successfully fetched deck:", transformedData)

  return NextResponse.json(
    { deck: transformedData },
    { status: 200 }
  )
}

// update deck
export async function PUT(req: Request, { params } : {params: {id:string}}){
    console.log("PUT /api/decks/[id] - Updating deck")
    
    const supabase = await createClient()
    const body = await req.json()
    const { name, description, is_public } = body
    const { id } = await params

    console.log("Updating deck with data:", { id, name, description, is_public })

    const { data, error} = await supabase.from('decks')
        .update({ name, description, is_public, updated_at: new Date().toISOString()})
        .eq('id', id).select().single()
    
    if(error) {
        console.error("Error updating deck:", error)
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }

    console.log("Successfully updated deck:", data)

    return NextResponse.json(
        {deck: data},
        {status: 200}
    )
}


// delete deck
export async function DELETE(_:Request, {params}:{params: {id:string}}){
    console.log("DELETE /api/decks/[id] - Deleting deck")
    
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        console.log("Authentication failed:", authError?.message || "No user found")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Deleting deck with ID:", params.id, "for user:", user.id)

    const { data: deck, error: fetchError } = await supabase
        .from('decks')
        .select('id, user_id, name')
        .eq('id', params.id)
        .single()

    if (fetchError) {
        console.error("Error fetching deck:", fetchError)
        return NextResponse.json({ error: "Deck not found" }, { status: 404 })
    }

    if (deck.user_id !== user.id) {
        console.error("User not authorized to delete this deck")
        return NextResponse.json({ error: "Not authorized to delete this deck" }, { status: 403 })
    }

    console.log("Deck found:", deck.name, "Proceeding with deletion...")

    const { data: cards, error: countError } = await supabase
        .from('cards')
        .select('id')
        .eq('deck_id', params.id)

    if (!countError) {
        console.log(`Deck has ${cards?.length || 0} cards that will be deleted via cascade`)
    }

    const { data: deleteResult, error } = await supabase
        .from('decks')
        .delete()
        .eq('id', params.id)
        .select()
    
    if (error) {
        console.error("Error deleting deck:", error)
        console.error("Error details:", {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        })
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }

    console.log("Successfully deleted deck:", params.id)
    console.log("Delete result:", deleteResult)

    return NextResponse.json(
        {success: true, deletedDeck: deleteResult},
        {status: 200}
    )
}