import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { supabaseServer } from '../../../../../../lib/server/supabase'; // Adjust path as needed

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Implement role-based access control
    const { data: { user }, error: authError } = await supabaseServer.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user's role from your Prisma database (assuming you store roles there)
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (!dbUser || dbUser.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden: Insufficient permissions' }, { status: 403 });
    }

    const newsletterSubscribers = await prisma.newsletterSubscriber.findMany({
      select: {
        id: true,
        email: true,
        subscribedAt: true,
      },
    });

    return NextResponse.json(newsletterSubscribers);
  } catch (error) {
    console.error('Error fetching newsletter subscribers data:', error);
    return NextResponse.json({ message: 'Error fetching newsletter subscribers data' }, { status: 500 });
  }
}
