"use client"

import type * as React from "react"
import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  children?: React.ReactNode; 

}

function PaginationLink({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) {
  return <Button variant="outline" size="sm" className={cn(className)} {...props} />
}

function PaginationPrevious({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="outline" size="icon" className={cn(className)} {...props}>
      <ChevronLeft className="h-4 w-4" />
      <span className="sr-only">Previous page</span>
    </Button>
  )
}

function PaginationNext({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <Button variant="outline" size="icon" className={cn(className)} {...props}>
      <ChevronRight className="h-4 w-4" />
      <span className="sr-only">Next page</span>
    </Button>
  )
}

function PaginationEllipsis({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("font-semibold", className)} {...props}>
      ...
    </span>
  )
}

function PaginationItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-center", className)} {...props} />
}

function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-center space-x-2", className)} {...props} />
}

export { PaginationContent, PaginationItem, PaginationLink, PaginationEllipsis, PaginationPrevious, PaginationNext }

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-4">
      <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} />
      {currentPage > 2 && (
        <>
          <PaginationLink href="#" onClick={() => onPageChange(1)}>
            1
          </PaginationLink>
          <PaginationEllipsis />
        </>
      )}
      {currentPage > 1 && (
        <PaginationLink href="#" onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </PaginationLink>
      )}
      <PaginationItem>
        <Button variant="default" size="sm">
          {currentPage}
        </Button>
      </PaginationItem>
      {currentPage < totalPages && (
        <PaginationLink href="#" onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </PaginationLink>
      )}
      {currentPage < totalPages - 1 && (
        <>
          <PaginationEllipsis />
          <PaginationLink href="#" onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </>
      )}
      <PaginationNext onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} />
    </nav>
  )
}
