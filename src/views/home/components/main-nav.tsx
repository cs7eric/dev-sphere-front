
import { cn } from "@/lib/utils"
import {Link} from "react-router-dom";
import React from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        to={"/"}
        className="text-sm font-bold transition-colors hover:text-primary"
      >
        Devsphere
      </Link>
      <Link
        to={"/explore"}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Explore
      </Link>
      <Link
        to={"/job"}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Job
      </Link>
      <Link
        to={"/group"}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Groups
      </Link>
      <Link
        to={"/roadmap"}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Roadmap
      </Link>
      <Link
        to={"/settings"}
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
