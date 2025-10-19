import { Skeleton } from "@/components/ui/skeleton"

export function GlobalSkeleton() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="space-y-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
