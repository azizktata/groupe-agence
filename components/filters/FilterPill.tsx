import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import React, { forwardRef } from 'react';
type FilterPillProps = {
  label: string;
  active?: boolean;
  primary?: boolean;
  onClick?: () => void;
};
export const FilterPill = forwardRef<HTMLButtonElement, FilterPillProps>(
  ({ label, active, primary, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref} // 1. Attach the ref
        onClick={onClick} // 2. This now receives the trigger handler
        {...props} // 3. Spread remaining props (onMouseEnter, aria-attributes, etc.)
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap",
          primary
            ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
            : "border border-slate-200 text-slate-700 hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]",
          active && "border-[var(--brand-primary)] bg-blue-50 text-[var(--brand-primary)]"
        )}
      >
        {label}
        {!primary && <ChevronDown className="w-3.5 h-3.5" />}
      </button>
    );
  }
);

FilterPill.displayName = "FilterPill";