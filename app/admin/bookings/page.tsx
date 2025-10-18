import { BookingManagement } from "@/components/admin/booking-management";

export default function AdminBookingsPage() {
  return 
  <div>
    <h1 className="text-primary text-4xl font-bold mb-2 mt-6">Blog Posts</h1>
    <p className="text-muted-foreground mb-6">Manage and publish blog posts for your website</p>
    <BookingManagement />
  </div>;
}
