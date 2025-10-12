import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for unsubscribing from the newsletter
const unsubscribeNewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = unsubscribeNewsletterSchema.parse(body);

    const { email } = validatedData;

    // Check if email exists
    const existingSubscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email },
    });

    if (!existingSubscriber) {
      return NextResponse.json({ message: 'Email not subscribed' }, { status: 404 });
    }

    await prisma.newsletterSubscriber.delete({
      where: { email },
    });

    return NextResponse.json({ message: 'Unsubscribed successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error unsubscribing from newsletter:', error);
    return NextResponse.json({ message: 'Error unsubscribing from newsletter' }, { status: 500 });
  }
}
