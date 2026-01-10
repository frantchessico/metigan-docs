import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { AlertCircle, CheckCircle2, Info, AlertTriangle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "relative rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground [&>svg]:text-muted-foreground",
        note: "bg-blue-500/10 border-blue-500/20 text-blue-900 dark:text-blue-400 [&>svg]:text-blue-600 dark:[&>svg]:text-blue-400",
        warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-900 dark:text-yellow-400 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400",
        error: "bg-red-500/10 border-red-500/20 text-red-900 dark:text-red-400 [&>svg]:text-red-600 dark:[&&>svg]:text-red-400",
        success: "bg-green-500/10 border-green-500/20 text-green-900 dark:text-green-400 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
        tip: "bg-purple-500/10 border-purple-500/20 text-purple-900 dark:text-purple-400 [&>svg]:text-purple-600 dark:[&>svg]:text-purple-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default: Info,
  note: Info,
  warning: AlertTriangle,
  error: AlertCircle,
  success: CheckCircle2,
  tip: Lightbulb,
}

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  title?: string
}

export function Callout({ className, variant = "default", title, children, ...props }: CalloutProps) {
  const Icon = iconMap[variant || "default"]

  return (
    <div className={cn(calloutVariants({ variant }), className)} {...props}>
      <Icon className="h-4 w-4" />
      {title && (
        <div className="mb-1 font-semibold leading-none tracking-tight">
          {title}
        </div>
      )}
      <div className="text-sm [&_p]:leading-relaxed [&_p]:mt-2">
        {children}
      </div>
    </div>
  )
}

