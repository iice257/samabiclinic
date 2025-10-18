import { NewsletterManagement } from "@/components/admin/newsletter-management";

export default function AdminNewslettersPage() {
  return (
  <div className="px-4 py-4 md:px-8 md:py-8">
    <h1 className="text-primary text-3xl md:text-4xl font-bold mb-2 mt-6">Newsletters</h1>
    <p className="text-muted-foreground mb-6">Create edit and send out newsletters from here.</p>
  <NewsletterManagement />
  </div>
);
}
