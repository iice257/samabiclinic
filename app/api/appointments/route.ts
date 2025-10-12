import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for creating a new appointment
const createAppointmentSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  doctorId: z.string().min(1, 'Doctor ID is required'),
  startTime: z.string().datetime('Invalid start time format').transform((str) => new Date(str)),
  endTime: z.string().datetime('Invalid end time format').transform((str) => new Date(str)),
  notes: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional().default('pending'),
});

export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: {
          select: {
            name: true,
            email: true,
          },
        },
        doctor: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json({ message: 'Error fetching appointments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = createAppointmentSchema.parse(body);

    const newAppointment = await prisma.appointment.create({
      data: validatedData,
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error creating appointment:', error);
    return NextResponse.json({ message: 'Error creating appointment' }, { status: 500 });
  }
}
