export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
     return (
          <div
               className={`animate-pulse rounded-md bg-neutral ${className}`}
               {...props}
          />
     );
}

export function ProductCardSkeleton() {
     return (
          <div className="space-y-4">
               <Skeleton className="aspect-[4/5] w-full" />
               <div className="space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/4" />
               </div>
          </div>
     );
}
