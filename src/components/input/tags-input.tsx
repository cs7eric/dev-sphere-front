"use client"

import * as React from "react"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface Tag {
  id: string
  text: string
}

interface TagOption {
  value: string
  label: string
}

export interface TagsInputProps extends React.ComponentProps<typeof CommandPrimitive> {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: TagOption[]
  placeholder?: string
  maxTags?: number
  maxLength?: number
}

export function TagsInput({
  className,
  value = [],
  onChange,
  placeholder = "Add a tag...",
  maxTags = 5,
  maxLength = 15,
  ...props
}: TagsInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = React.useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      if (value.length >= maxTags) {
        return
      }
      if (inputValue.length > maxLength) {
        return
      }
      onChange?.([...value, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleRemove = (index: number) => {
    const newValue = [...value]
    newValue.splice(index, 1)
    onChange?.(newValue)
  }

  return (
    <CommandPrimitive
      data-slot="tags-input"
      className={cn(
        "border-input flex min-h-6 w-full items-center gap-1 rounded-md border px-3  text-sm shadow-xs",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap max-w-full gap-2 py-1">
        {value.map((tag, index) => (
          <Badge key={`${tag}-${index}`} variant="secondary" className="max-h-[22px] mt-1">
            {tag}
            <button
              type="button"
              className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleRemove(index)
                }
              }}
              onMouseDown={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
            </button>
          </Badge>
        ))}
        <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={value.length === 0 ? placeholder : ""}
        className="flex-1 bg-transparent py-1.5 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
      />
      </div>
      
    </CommandPrimitive>
  )
}