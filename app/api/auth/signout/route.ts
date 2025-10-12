import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../../../../lib/server/supabase'; // Adjust path as needed

export async function POST(request: Request) {
  try {
    const { error } = await supabaseServer.auth.signOut();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Sign out successful' }, { status: 200 });
  } catch (error) {
    console.error('Error during sign out:', error);
    return NextResponse.json({ message: 'Error during sign out' }, { status: 500 });
  }
}
