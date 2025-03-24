"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const languages = [
  {
    value: "java",
    label: "Java",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "javascript",
    label: "JavaScript",
  },
  {
    value: "cpp",
    label: "C++",
  },
  {
    value: "go",
    label: "Go",
  },
]

interface LanguageSwitcherProps {
  className?: string;
  onLanguageChange?: (language: string) => void;
}

export function LanguageSwitcher({ className, onLanguageChange }: LanguageSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setValue(savedLanguage);
    }
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          {value
            ? languages.find((language) => language.value === value)?.label
            : "选择编程语言..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="搜索编程语言..." />
          <CommandList>
            <CommandEmpty>未找到匹配的语言</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    localStorage.setItem('selectedLanguage', currentValue);
                    setValue(currentValue === value ? "" : currentValue);
                    
                    if (onLanguageChange) {
                      onLanguageChange(currentValue === value ? "" : currentValue);
                    }
                    
                    setOpen(false);
                  }}
                >
                  {language.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === language.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
