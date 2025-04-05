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
  categoryId?: string;
  onCategoryIdChange?: (id: string) => void;
}

const ComboboxArea: React.FC<Props> = ({list, value, onChange, onCategoryIdChange}) => {
  const [open, setOpen] = React.useState(false)
  const [displayValue, setDisplayValue] = React.useState<string>("") // 用于显示的值

  // 当外部value变化时，更新显示值
  React.useEffect(() => {
    // 如果value是id，则查找对应的categoryName作为显示值
    if (value) {
      const category = list.find((cat) => cat.id === value);
      if (category) {
        setDisplayValue(category.categoryName);
      }
    } else {
      setDisplayValue("");
    }
  }, [value, list]);

  const handleSelect = (currentValue: string) => {
    const selectedCategory = list.find((category) => category.categoryName === currentValue)
    const categoryId = selectedCategory ? selectedCategory.id : ""
    setOpen(false)
    
    // 更新显示值
    setDisplayValue(currentValue)
    
    // 先设置categoryId，确保在onChange之前完成
    if (categoryId) {
      onCategoryIdChange?.(categoryId)
    }
    
    // 只传递id
    onChange?.(categoryId)
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
                      displayValue === category.categoryName ? "opacity-100" : "opacity-0"
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
