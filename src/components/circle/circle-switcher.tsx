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
  onChange?: (id: string) => void;
  value?: string;
  name?: string;
  circleId?: number;
  onCircleIdChange?: (id: number) => void;
}

const CircleSwitcher: React.FC<Props> = ({list, value, onChange, onCircleIdChange}) => {
  const [open, setOpen] = React.useState(false)
  const [displayValue, setDisplayValue] = React.useState<string>("") // 用于显示的值

  // 当外部value变化时，更新显示值
  React.useEffect(() => {
    // 如果value是id，则查找对应的circleName作为显示值
    if (value) {
      const circle = list.find((circle) => circle.id === value);
      if (circle) {
        setDisplayValue(circle.circleName);
      }
    } else {
      setDisplayValue("");
    }
  }, [value, list]);

  const handleSelect = (currentValue: string) => {
    const selectedCategory = list.find((circle) => circle.circleName === currentValue)
    const circleId = selectedCategory ? selectedCategory.id : ""
    setOpen(false)

    // 更新显示值
    setDisplayValue(currentValue)

    // 先设置circleId，确保在onChange之前完成
    if (circleId) {
      onCircleIdChange?.(circleId)
    }

    // 只传递id
    onChange?.(circleId)
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
          {displayValue || "Select framework..."}
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
                      displayValue === circle.circleName ? "opacity-100" : "opacity-0"
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
