// src/components/admin/AdminSelect.tsx
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  className?: string;
}

export function AdminSelect({ children, className, ...props }: AdminSelectProps) {
  return (
    <div className="relative">
      <select
        className={cn(
          "appearance-none rounded-xl border bg-white pl-3 pr-8 py-2 text-sm text-neutral-700",
          "focus:outline-none focus:ring-2 focus:ring-neutral-900",
          "cursor-pointer",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
    </div>
  );
}
