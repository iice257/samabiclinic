import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const prisma = new PrismaClient();

const createCheckoutSessionSchema = z.object({
  priceId: z.string().min(1, 'Price ID is required'),
  userId: z.string().min(1, 'User ID is required'),
  // You can add more fields here like quantity, metadata, etc.
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createCheckoutSessionSchema.parse(body);

    const { priceId, userId } = validatedData;

    // Create a new Payment record in your database with 'pending' status
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: 0, // Will be updated by webhook
        currency: 'usd', // Will be updated by webhook
        status: 'pending',
      },
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        userId,
        paymentId: payment.id, // Link Stripe session to your internal payment record
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ message: 'Error creating checkout session' }, { status: 500 });
  }
}
