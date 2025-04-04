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

const CircleSwitcher: React.FC<Props> = ({list, value, onChange}) => {
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
            ? list.find((circle) => circle.circleName === value)?.circleName
            : "Select circle..."}
          <ChevronsUpDown className="opacity-50"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search circle..."/>
          <CommandList className='overflow-y-auto no-scrollbar '>
            <CommandEmpty>No circle found.</CommandEmpty>
            <CommandGroup>
              {list.map((circle) => (
                <CommandItem
                  key={circle.id}
                  value={circle.circleName}
                  onSelect={handleSelect}
                >
                  {circle.circleName}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === circle.value ? "opacity-100" : "opacity-0"
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

export default CircleSwitcher
