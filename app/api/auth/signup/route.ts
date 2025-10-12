import { NextResponse } from 'next/server';
import { supabaseServer } from '../../../../../../lib/server/supabase'; // Adjust path as needed
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  name: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = signupSchema.parse(body);

    const { email, password, name } = validatedData;

    const { data, error } = await supabaseServer.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          // You can add default role here, or handle it in a trigger/webhook
          role: 'patient',
        },
      },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Optionally, you can create a corresponding user record in your Prisma database
    // This assumes you have a 'User' model in Prisma that mirrors Supabase auth users
    if (data.user) {
      await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email!,
          name: name || data.user.email!,
          role: 'patient', // Default role
        },
      });
    }

    return NextResponse.json({ message: 'Sign up successful. Please check your email to confirm your account.' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error during sign up:', error);
    return NextResponse.json({ message: 'Error during sign up' }, { status: 500 });
  }
}
