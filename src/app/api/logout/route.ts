import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  console.log("POST /api/logout - User logout attempt")
  
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout failed:", error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  console.log("Logout successful")
  return NextResponse.json({ message: "Logged out successfully" });
} 