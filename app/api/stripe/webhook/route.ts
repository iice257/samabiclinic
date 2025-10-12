import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ message: 'No stripe-signature header found' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ message: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.metadata?.paymentId) {
        const amountTotal = session.amount_total !== null ? session.amount_total / 100 : 0; // Amount in cents
        const currency = session.currency || 'usd';

        await prisma.payment.update({
          where: { id: session.metadata.paymentId },
          data: {
            status: 'completed',
            stripePaymentId: session.id,
            amount: amountTotal,
            currency: currency,
          },
        });
      }
      break;
    case 'checkout.session.async_payment_failed':
      const failedSession = event.data.object as Stripe.Checkout.Session;
      if (failedSession.metadata?.paymentId) {
        await prisma.payment.update({
          where: { id: failedSession.metadata.paymentId },
          data: {
            status: 'failed',
            stripePaymentId: failedSession.id,
          },
        });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
