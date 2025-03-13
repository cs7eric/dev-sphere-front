"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "../components/data-table-column-header"
import { DataTableRowActions } from "../components/data-table-row-actions"

/**
 * 根据DTO对象自动生成表格列配置
 * @param exampleObject DTO对象示例
 * @param options 列配置选项
 * @returns 生成的列配置
 */
export function generateColumns<T extends Record<string, any>>(
  exampleObject: T,
  options?: {
    // 需要排除的字段
    excludeFields?: string[]
    // 自定义列渲染
    customRenderers?: {
      [key: string]: (row: any) => React.ReactNode
    }
    // 是否包含选择框
    includeSelect?: boolean
    // 是否包含操作列
    includeActions?: boolean
    // 自定义列标题
    columnTitles?: {
      [key: string]: string
    }
  }
): ColumnDef<T>[] {
  const {
    excludeFields = [],
    customRenderers = {},
    includeSelect = true,
    includeActions = true,
    columnTitles = {}
  } = options || {}

  const columns: ColumnDef<T>[] = []

  // 添加选择框列
  if (includeSelect) {
    columns.push({
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    })
  }

  // 根据对象属性生成列
  Object.keys(exampleObject).forEach((key) => {
    // 跳过被排除的字段
    if (excludeFields.includes(key)) return

    const column: ColumnDef<T> = {
      accessorKey: key,
      header: ({ column }) => (
        <DataTableColumnHeader 
          column={column} 
          title={columnTitles[key] || key.charAt(0).toUpperCase() + key.slice(1)} 
        />
      ),
      cell: ({ row }) => {
        // 使用自定义渲染器（如果有）
        if (customRenderers[key]) {
          return customRenderers[key](row.original)
        }

        // 默认渲染
        const value = row.getValue(key)
        
        // 根据值类型进行不同的渲染
        if (value === null || value === undefined) {
          return <span className="text-muted-foreground">-</span>
        } else if (typeof value === 'boolean') {
          return <span>{value ? 'Yes' : 'No'}</span>
        } else if (typeof value === 'object') {
          return <span className="truncate max-w-[200px]">{JSON.stringify(value)}</span>
        }
        
        return <span className="truncate max-w-[300px]">{String(value)}</span>
      },
    }

    columns.push(column)
  })

  // 添加操作列
  if (includeActions) {
    columns.push({
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    })
  }

  return columns
}

/**
 * 根据DTO对象自动生成过滤器配置
 * @param exampleObject DTO对象示例
 * @param options 过滤器配置选项
 * @returns 生成的过滤器配置
 */
export function generateFacetedFilters<T extends Record<string, any>>(
  exampleObject: T,
  options?: {
    // 需要包含的字段（为空则自动检测枚举字段）
    includeFields?: string[]
    // 字段值映射（用于枚举字段）
    fieldValueMaps?: {
      [key: string]: Array<{
        label: string
        value: string | number | boolean
        icon?: React.ComponentType<{ className?: string }>
      }>
    }
    // 自定义列标题
    columnTitles?: {
      [key: string]: string
    }
  }
) {
  const {
    includeFields,
    fieldValueMaps = {},
    columnTitles = {}
  } = options || {}

  const filters: Array<{
    column: string
    title: string
    options: Array<{
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }>
  }> = []

  // 确定要包含的字段
  const fieldsToInclude = includeFields || Object.keys(exampleObject).filter(key => {
    const value = exampleObject[key]
    // 自动检测可能是枚举的字段（字符串或数字类型）
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean'
  })

  fieldsToInclude.forEach(key => {
    // 如果有预定义的值映射，使用它
    if (fieldValueMaps[key]) {
      filters.push({
        column: key,
        title: columnTitles[key] || key.charAt(0).toUpperCase() + key.slice(1),
        options: fieldValueMaps[key].map(item => ({
          label: item.label,
          value: String(item.value), // 确保值是字符串
          icon: item.icon
        }))
      })
    }
  })

  return filters
}