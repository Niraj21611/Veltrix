"use client"
import { Clock } from "lucide-react"

import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface TimePickerProps {
  time?: string
  setTime?: (time: string) => void
}

export function TimePicker({ time, setTime }: TimePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !time && "text-muted-foreground")}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : <span>Pick a time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="space-y-2">
          <h4 className="font-medium">Select Time</h4>
          <Input type="time" value={time} onChange={(e) => setTime && setTime(e.target.value)} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
