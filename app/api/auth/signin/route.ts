import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../../../../lib/server/supabase'; // Adjust path as needed
import { z } from 'zod';

const signinSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signinSchema.parse(body);

    const { email, password } = validatedData;

    const { data, error } = await supabaseServer.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Sign in successful', user: data.user }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error during sign in:', error);
    return NextResponse.json({ message: 'Error during sign in' }, { status: 500 });
  }
}
