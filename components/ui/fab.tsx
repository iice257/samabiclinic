"use client"

import { useState } from "react"
import { MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from "lucide-react"
import Link from "next/link"

export function fab() {
  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="default" className="rounded-full" aria-label="Open menu" size="icon-lg">
            <Plus />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>New</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
                <Link href="/admin/blog/new">Blog Post</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/admin/newsletters/new">Newsletter</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
