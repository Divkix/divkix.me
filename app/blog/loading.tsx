import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
          <Skeleton className="h-12 w-48" />
          <Skeleton className="h-6 w-96" />
        </div>

        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="glass-surface">
              <CardHeader>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
