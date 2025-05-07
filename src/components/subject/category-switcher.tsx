"use client"

import * as React from "react"
import { useState, useEffect } from "react"
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
import {
  queryLabelByCategoryIdUsingPost,
  SubjectLabelDTO
} from "@/apis/subject"

// 默认分类数据，在API加载前显示
export const categories = [
  {
    value: "frontend",
    label: "前端开发",
  },
  {
    value: "backend",
    label: "后端开发",
  },
  {
    value: "database",
    label: "数据库",
  },
  {
    value: "devops",
    label: "DevOps",
  },
  {
    value: "algorithm",
    label: "算法与数据结构",
  },
]

interface CategorySwitcherProps {
  className?: string;
  value: string;
  onValueChange: (value: string) => void;
}

export function CategorySwitcher({ className, value, onValueChange }: CategorySwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const [labelList, setLabelList] = useState<SubjectLabelDTO[]>([])
  const [loading, setLoading] = useState(false)
  
  // 从API获取分类数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 这里使用一个默认的categoryId，实际使用时可能需要根据需求调整
        const body: SubjectLabelDTO = {
          categoryId: 14
        }
        const res = await queryLabelByCategoryIdUsingPost({body})
        console.log('获取到的分类数据:', res)
        if (res.data && Array.isArray(res.data)) {
          setLabelList(res.data)
        }
      } catch (error) {
        console.error('获取分类数据失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [])
  
  // 将API返回的数据转换为组件需要的格式
  const categoryOptions = labelList.length > 0 
    ? labelList.map(label => ({
        value: String(label.id),
        label: label.labelName || '未命名分类'
      }))
    : categories // 如果API数据为空，使用默认分类数据
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {loading ? "加载中..." : 
            (value
              ? categoryOptions.find((category) => category.value === value)?.label
              : "选择题目分类...")}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="搜索分类..." />
          <CommandList>
            <CommandEmpty>未找到匹配的分类</CommandEmpty>
            <CommandGroup>
              {categoryOptions.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {category.label}
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