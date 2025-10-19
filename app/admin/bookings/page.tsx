import { BookingManagement } from "@/components/admin/booking-management";

export default function AdminBookingsPage() {
  return (
  <div className="px-4 py-4 md:px-8 md:py-8">
    <h1 className="text-primary text-3xl md:text-4xl font-bold mb-2 mt-6">Bookings & Appointments</h1>
    <p className="text-muted-foreground mb-6">Here's where you view and manage your bookings.</p>
    <BookingManagement />
  </div>
);
}
