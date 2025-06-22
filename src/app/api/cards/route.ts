import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log("GET /api/cards - Fetching cards")
    
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const deck_id = searchParams.get('deck_id')
    const sort_by_progress = searchParams.get('sort_by_progress')
    
    console.log("Query params:", { deck_id, sort_by_progress })
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    const userId = user?.id

    let query = supabase.from('cards').select('*')
    
    if (deck_id) {
        console.log("Filtering cards for deck:", deck_id)
        query = query.eq('deck_id', deck_id)
    }

    query = query.not('front', 'eq', '').not('back', 'eq', '')

    const { data, error } = await query

    if (error) {
        console.error("Error fetching cards:", error)
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }

    console.log("Successfully fetched cards:", data?.length || 0, "cards")

    if (sort_by_progress === 'true' && userId && data) {
        try {
            const { data: progressData } = await supabase
                .from('user_card_progress')
                .select('card_id, last_reviewed, next_review')
                .eq('user_id', userId)

            const progressMap = new Map()
            progressData?.forEach(progress => {
                progressMap.set(progress.card_id, progress)
            })

            data.sort((a, b) => {
                const progressA = progressMap.get(a.id)
                const progressB = progressMap.get(b.id)

                if (!progressA && !progressB) return 0
                if (!progressA) return 1
                if (!progressB) return -1

                const lastReviewedA = new Date(progressA.last_reviewed || 0)
                const lastReviewedB = new Date(progressB.last_reviewed || 0)
                
                if (lastReviewedA.getTime() !== lastReviewedB.getTime()) {
                    return lastReviewedB.getTime() - lastReviewedA.getTime()
                }

                const nextReviewA = new Date(progressA.next_review || 0)
                const nextReviewB = new Date(progressB.next_review || 0)
                return nextReviewA.getTime() - nextReviewB.getTime()
            })

            console.log("Cards sorted by user progress")
        } catch (progressError) {
            console.error("Error sorting by progress:", progressError)
        }
    }
    
    return NextResponse.json(
        {cards: data},
        {status: 200}
    )
}

export async function POST(req: Request){
    console.log("POST /api/cards - Creating new card")
    
    const supabase = await createClient()
    const body = await req.json()
    const { deck_id, front, back } = body

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        console.log("Authentication failed:", authError?.message || "No user found")
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    console.log("Creating card with data:", { user_id: user.id, deck_id, front, back })

    if (!front?.trim() || !back?.trim()) {
        console.error("Card front or back is empty")
        return NextResponse.json(
            {error: "Card front and back cannot be empty"},
            {status: 400}
        )
    }

    const { data, error } = await supabase.from('cards').insert({
        user_id: user.id, 
        deck_id, 
        front, 
        back
    }).select().single()

    if(error) {
        console.error("Error creating card:", error)
        return NextResponse.json(
            {error: error.message},
            {status: 400}
        )
    }

    console.log("Successfully created card:", data)
    
    return NextResponse.json(
        {card: data},
        {status: 201}
    )
}