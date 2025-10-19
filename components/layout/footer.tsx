import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { NewsletterForm } from "./newsletter-form"


export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Image
                    src="/favicon.png"
                    alt="Samabi Logo"
                    width={40}
                    height={40}
                    className="rounded-sm object-cover transition-transform duration-700 group-hover:scale-105"
                  />
              </div>
              <span className="font-bold text-xl text-foreground">Samabi</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming health through personalized functional medicine. Your journey to optimal wellness starts
              here.
            </p>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://instagram.com/samabifunctionalmed" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              {/*
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {["About Us", "Services", "Treatments", "Insights", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  No 5 Isaac Ken Close, off farm Road Rumuosi Portharcourt. The nearest Bus Stop: East West Road by Amaechi School, Rumuosi Portharcourt.
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+2348166423218"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  +234 816 642 3218
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:Kazeem.uthman@npmcn.com"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Kazeem.uthman@npmcn.com
                </a>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to our newsletter for health tips and updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Samabi Functional Medicine Clinic. All rights{" "}
                <a href="/admin" className="transition-colors font-bold hover:text-primary">
                  reserved.
                </a>
            </p>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
