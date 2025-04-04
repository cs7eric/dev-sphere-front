"use client"

import * as React from "react"
import {Check, ChevronsUpDown} from "lucide-react"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
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

interface Props {
  list,
  onChange?: (value: string) => void
}

const ComboboxArea: React.FC<Props> = ({list, value, onChange}) => {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue
    setOpen(false)
    onChange?.(newValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? list.find((category) => category.categoryName === value)?.categoryName
            : "Select framework..."}
          <ChevronsUpDown className="opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..."/>
          <CommandList className='overflow-y-auto no-scrollbar '>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {list.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.categoryName}
                  onSelect={handleSelect}
                >
                  {category.categoryName}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0"
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

export default ComboboxArea
