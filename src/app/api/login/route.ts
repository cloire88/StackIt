import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("POST /api/login - User login attempt")
  
  const { email, password } = await req.json();
  console.log("Login attempt for email:", email)
  
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.error("Login failed:", error.message)
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
  
  console.log("Login successful for user:", data.user?.id)
  return NextResponse.json({ user: data.user });
}
