import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-8xl text-primary md:text-9xl">404</h1>
          <h2 className="mb-4 text-balance font-bold text-2xl text-foreground md:text-3xl">
            This Page Isn't Ready Yet — Or It Might Not Exist
          </h2>
          <p className="mx-auto max-w-md text-balance text-muted-foreground leading-relaxed">
            We're constantly improving the Samabi experience. The page you're looking for may be under development or
            has been moved.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="group w-full sm:w-auto" asChild>
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Return to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="group w-full sm:w-auto bg-transparent" asChild>
            <Link href="/contact">
              Contact Support
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="mb-4 font-medium text-foreground text-sm">Quick Links</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-sm">
            <Link href="/about" className="transition-colors hover:text-primary">
              About Us
            </Link>
            <span>•</span>
            <Link href="/services" className="transition-colors hover:text-primary">
              Services
            </Link>
            <span>•</span>
            <Link href="/treatments" className="transition-colors hover:text-primary">
              Treatments
            </Link>
            <span>•</span>
            <Link href="/insights" className="transition-colors hover:text-primary">
              Insights
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
