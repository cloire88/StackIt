import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("GET /api/profile - Fetching user profile")
  
  const supabase = await createClient();

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Authentication failed:", authError?.message || "No user found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    console.log("Authenticated user:", user.id)

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        console.log("Profile not found, creating default profile")
        
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            username: user.email?.split('@')[0] || `user_${user.id.slice(0, 8)}`,
            full_name: user.user_metadata?.full_name || null,
            avatar_url: user.user_metadata?.avatar_url || null,
          })
          .select()
          .single();

        if (createError) {
          console.error("Error creating profile:", createError)
          return NextResponse.json(
            { error: createError.message },
            { status: 500 }
          );
        }

        console.log("Successfully created default profile:", newProfile)
        return NextResponse.json(
          { profile: newProfile },
          { status: 200 }
        );
      }

      console.error("Error fetching profile:", profileError)
      return NextResponse.json(
        { error: profileError.message },
        { status: 500 }
      );
    }

    console.log("Successfully fetched profile:", profile)
    return NextResponse.json(
      { profile },
      { status: 200 }
    );

  } catch (error) {
    console.error('Profile API error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  console.log("PUT /api/profile - Updating user profile")
  
  const supabase = await createClient();

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log("Authentication failed:", authError?.message || "No user found")
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { username, full_name, avatar_url } = body;

    console.log("Updating profile with data:", { username, full_name, avatar_url })

    if (username && typeof username !== 'string') {
      console.log("Invalid username type:", typeof username)
      return NextResponse.json(
        { error: "Username must be a string" },
        { status: 400 }
      );
    }

    if (full_name && typeof full_name !== 'string') {
      console.log("Invalid full_name type:", typeof full_name)
      return NextResponse.json(
        { error: "Full name must be a string" },
        { status: 400 }
      );
    }

    if (avatar_url && typeof avatar_url !== 'string') {
      console.log("Invalid avatar_url type:", typeof avatar_url)
      return NextResponse.json(
        { error: "Avatar URL must be a string" },
        { status: 400 }
      );
    }

    if (username) {
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', user.id)
        .single();

      if (existingUser) {
        console.log("Username already taken:", username)
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 409 }
        );
      }
    }

    const { data: updatedProfile, error: updateError } = await supabase
      .from('profiles')
      .update({
        username: username || undefined,
        full_name: full_name || undefined,
        avatar_url: avatar_url || undefined,
      })
      .eq('id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating profile:", updateError)
      return NextResponse.json(
        { error: updateError.message },
        { status: 500 }
      );
    }

    console.log("Successfully updated profile:", updatedProfile)
    return NextResponse.json(
      { profile: updatedProfile },
      { status: 200 }
    );

  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
