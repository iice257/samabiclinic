import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for subscribing to the newsletter
const subscribeNewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = subscribeNewsletterSchema.parse(body);

    const { email } = validatedData;

    // Check if email already exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    const newSubscriber = await prisma.newsletterSubscriber.create({
      data: { email },
    });

    return NextResponse.json(newSubscriber, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json({ message: 'Error subscribing to newsletter' }, { status: 500 });
  }
}
