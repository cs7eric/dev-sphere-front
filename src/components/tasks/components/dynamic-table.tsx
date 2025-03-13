"use client"

import * as React from "react"
import { DataTable } from "./data-table"
import { generateColumns, generateFacetedFilters } from "../utils/generate-columns"

interface DynamicTableProps<T extends Record<string, any>> {
  data: T[]
  exampleObject: T
  filterColumn?: string
  searchPlaceholder?: string
  excludeFields?: string[]
  customRenderers?: {
    [key: string]: (row: any) => React.ReactNode
  }
  includeSelect?: boolean
  includeActions?: boolean
  columnTitles?: {
    [key: string]: string
  }
  fieldValueMaps?: {
    [key: string]: Array<{
      label: string
      value: string | number | boolean
      icon?: React.ComponentType<{ className?: string }>
    }>
  }
  includeFilterFields?: string[]
  onRowClick?: (row: T) => void
}

export function DynamicTable<T extends Record<string, any>>({
  data,
  exampleObject,
  filterColumn = "id",
  searchPlaceholder,
  excludeFields = [],
  customRenderers = {},
  includeSelect = true,
  includeActions = true,
  columnTitles = {},
  fieldValueMaps = {},
  includeFilterFields,
  onRowClick,
}: DynamicTableProps<T>) {
  // 生成列配置
  const columns = React.useMemo(
    () =>
      generateColumns(exampleObject, {
        excludeFields,
        customRenderers,
        includeSelect,
        includeActions,
        columnTitles,
      }),
    [exampleObject, excludeFields, customRenderers, includeSelect, includeActions, columnTitles]
  )

  // 生成过滤器配置
  const facetedFilters = React.useMemo(
    () =>
      generateFacetedFilters(exampleObject, {
        includeFields: includeFilterFields,
        fieldValueMaps,
        columnTitles,
      }),
    [exampleObject, includeFilterFields, fieldValueMaps, columnTitles]
  )

  return (
    <DataTable
      columns={columns}
      data={data}
      filterColumn={filterColumn}
      searchPlaceholder={searchPlaceholder}
      facetedFilters={facetedFilters}
      onRowClick={onRowClick}
    />
  )
}