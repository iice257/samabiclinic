import { NextResponse } from 'next/server';
import { PrismaClient } from '../../../../../../lib/generated/prisma'; // Adjust path as needed
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for updating an appointment
const updateAppointmentSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required').optional(),
  doctorId: z.string().min(1, 'Doctor ID is required').optional(),
  startTime: z.string().datetime('Invalid start time format').transform((str) => new Date(str)).optional(),
  endTime: z.string().datetime('Invalid end time format').transform((str) => new Date(str)).optional(),
  notes: z.string().optional(),
  status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
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

    if (!appointment) {
      return NextResponse.json({ message: 'Appointment not found' }, { status: 404 });
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return NextResponse.json({ message: 'Error fetching appointment' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const validatedData = updateAppointmentSchema.parse(body);

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedAppointment);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Validation error', errors: error.errors }, { status: 400 });
    }
    console.error('Error updating appointment:', error);
    return NextResponse.json({ message: 'Error updating appointment' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    await prisma.appointment.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Appointment deleted successfully' }, { status: 204 });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json({ message: 'Error deleting appointment' }, { status: 500 });
  }
}
