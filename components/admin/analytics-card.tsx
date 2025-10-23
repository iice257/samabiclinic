"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  description: string
  icon: React.ReactNode
  mainStat: string | number
  mainLabel: string
  expandedContent?: React.ReactNode
}

export function AnalyticsCard({ title, description, icon, mainStat, mainLabel, expandedContent }: AnalyticsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      className="hover:shadow-lg transition-all cursor-pointer"
      onClick={() => expandedContent && setIsExpanded(!isExpanded)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              {icon}
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
          {expandedContent && (
            <button className="p-1 hover:bg-muted rounded">
              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <p className="text-3xl font-bold">{mainStat}</p>
          <p className="text-sm text-muted-foreground">{mainLabel}</p>
        </div>
        {isExpanded && expandedContent && <div className="border-t pt-4">{expandedContent}</div>}
      </CardContent>
    </Card>
  )
}
