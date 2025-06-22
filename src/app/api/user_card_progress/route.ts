import { createClient } from "@/utils/supabase/server"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log("GET /api/user_card_progress - Fetching user card progress")
  
  const { searchParams } = new URL(request.url)
  const cardId = searchParams.get('card_id')
  const userId = searchParams.get('user_id')
  const nextReview = searchParams.get('next_review')
  
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    console.log("Authentication failed:", authError?.message || "No user found")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  console.log("Query params:", { cardId, userId, nextReview, authenticatedUserId: user.id })

  if (nextReview === 'true') {
    const now = new Date()
    
    const { data: progressData, error: progressError } = await supabase
      .from('user_card_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('next_review', { ascending: true })
      .limit(1)

    if (progressError) {
      console.error("Error fetching next review progress:", progressError)
      return NextResponse.json({ error: progressError.message }, { status: 400 })
    }

    if (!progressData || progressData.length === 0) {
      return NextResponse.json({ nextReviewCard: null }, { status: 200 })
    }

    const nextCardProgress = progressData[0]
    
    const { data: cardData, error: cardError } = await supabase
      .from('cards')
      .select('*')
      .eq('id', nextCardProgress.card_id)
      .single()

    if (cardError) {
      console.error("Error fetching card details:", cardError)
      return NextResponse.json({ error: cardError.message }, { status: 400 })
    }

    const { data: deckData, error: deckError } = await supabase
      .from('decks')
      .select('*')
      .eq('id', cardData.deck_id)
      .single()

    if (deckError) {
      console.error("Error fetching deck details:", deckError)
      return NextResponse.json({ error: deckError.message }, { status: 400 })
    }

    const nextReviewCard = {
      card: cardData,
      deck: deckData,
      progress: nextCardProgress
    }

    console.log("Successfully fetched next review card:", nextReviewCard)
    return NextResponse.json({ nextReviewCard }, { status: 200 })
  }

  let query = supabase
    .from('user_card_progress')
    .select('*')
    .eq('user_id', user.id)

  if (cardId) {
    query = query.eq('card_id', cardId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching user card progress:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  console.log("Successfully fetched user card progress:", data?.length || 0, "records")
  return NextResponse.json({ progress: data }, { status: 200 })
}

export async function POST(request: Request) {
  console.log("POST /api/user_card_progress - Updating card progress")
  
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    console.log("Authentication failed:", authError?.message || "No user found")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { card_id, quality } = body 

  console.log("Reviewing card with data:", { card_id, quality, user_id: user.id })

  const { data: existingProgress, error: fetchError } = await supabase
    .from('user_card_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('card_id', card_id)
    .single()

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error("Error fetching existing progress:", fetchError)
    return NextResponse.json({ error: fetchError.message }, { status: 400 })
  }

  const now = new Date()
  let newProgress

  if (existingProgress) {
    const updatedProgress = calculateNextReview(existingProgress, quality)
    console.log("Updating existing progress:", updatedProgress)

    const { data, error } = await supabase
      .from('user_card_progress')
      .update(updatedProgress)
      .eq('user_id', user.id)
      .eq('card_id', card_id)
      .select()
      .single()

    if (error) {
      console.error("Error updating progress:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    newProgress = data
  } else {
    const initialProgress = {
      user_id: user.id,
      card_id,
      last_reviewed: now.toISOString(),
      interval: quality >= 3 ? 1 : 0, 
      ease_factor: 2.5,
      repetition: 1,
      next_review: quality >= 3 ? new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString() : now.toISOString()
    }

    console.log("Creating new progress:", initialProgress)

    const { data, error } = await supabase
      .from('user_card_progress')
      .insert(initialProgress)
      .select()
      .single()

    if (error) {
      console.error("Error creating progress:", error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    newProgress = data
  }

  console.log("Successfully updated card progress:", newProgress)
  return NextResponse.json({ progress: newProgress }, { status: 200 })
}

function calculateNextReview(currentProgress: any, quality: number): any {
  const now = new Date()
  let { interval, ease_factor, repetition } = currentProgress

  if (repetition > 0) {
    if (quality >= 3) {
      if (repetition === 1) {
        interval = 6 
      } else {
        interval = Math.round(interval * ease_factor)
      }
      repetition++
    } else if (quality === 2) {
      interval = Math.max(1, Math.round(interval * 0.8))
      repetition++
    } else {
      interval = 0
      repetition = 0
    }
  } else {
    if (quality >= 3) {
      interval = 1
      repetition = 1
    } else {
      interval = 0
      repetition = 0
    }
  }

  if (quality >= 3) {
    ease_factor = Math.max(1.3, ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))
  } else {
    ease_factor = Math.max(1.3, ease_factor - 0.2)
  }

  const nextReview = interval > 0 
    ? new Date(now.getTime() + interval * 24 * 60 * 60 * 1000).toISOString()
    : now.toISOString()

  return {
    last_reviewed: now.toISOString(),
    interval,
    ease_factor,
    repetition,
    next_review: nextReview
  }
}