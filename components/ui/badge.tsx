import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, variant = "secondary", ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: "secondary" | "default" }) {
  const styles = {
    default: "bg-blue-600 text-white",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200",
  } as const;
  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs", styles[variant], className)} {...props} />
  );
}