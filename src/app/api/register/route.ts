import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  console.log("POST /api/register - User registration attempt")
  
  const { email, password } = await req.json();
  console.log("Registration attempt for email:", email)
  
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    console.error("Registration failed:", error.message)
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  console.log("Registration successful for user:", data.user?.id)
  return NextResponse.json({ user: data.user });
}
