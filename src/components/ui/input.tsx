import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, value, onChange, onFocus, onBlur, ...props }, ref) => {
    // Controlled number inputs: while the field has focus, show exactly what the user types.
    // Without this, clearing the field makes the parent store 0 and typing "2" shows "02",
    // and converted/rounded values overwrite the text mid-typing.
    const [draft, setDraft] = React.useState<string | null>(null)
    const keepDraft = type === "number" && value !== undefined

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        value={keepDraft && draft !== null ? draft : value}
        onFocus={(e) => {
          if (keepDraft) setDraft(String(value ?? ""))
          onFocus?.(e)
        }}
        onChange={(e) => {
          if (keepDraft) setDraft(e.target.value)
          onChange?.(e)
        }}
        onBlur={(e) => {
          if (keepDraft) setDraft(null)
          onBlur?.(e)
        }}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
