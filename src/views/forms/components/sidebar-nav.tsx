"use client"

import { useLocation } from 'react-router-dom';

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import React from "react";
import { NavLink} from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({className, items, ...props}: SidebarNavProps) {
  const pathname = useLocation()

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              buttonVariants({ variant: "ghost" }),
              isActive || pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline",
              "justify-start"
            )
          }
          end // 精确匹配路径
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  )
}
