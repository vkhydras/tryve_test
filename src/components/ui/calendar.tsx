"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  onMonthYearChange?: (date: Date) => void;
};

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 1000 }, (_, i) => currentYear - i);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onMonthYearChange,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState(props.defaultMonth || new Date());
  const [yearSearch, setYearSearch] = React.useState("");
  const [isYearOpen, setIsYearOpen] = React.useState(false);

  const filteredYears = React.useMemo(() => {
    return years
      .filter((year) => year.toString().includes(yearSearch))
      .slice(0, 100); // Limit displayed results for performance
  }, [yearSearch]);

  const handleMonthChange = (newMonth: string) => {
    const newDate = new Date(month);
    newDate.setMonth(months.indexOf(newMonth));
    setMonth(newDate);
    onMonthYearChange?.(newDate);
  };

  const handleYearChange = (newYear: string) => {
    const newDate = new Date(month);
    newDate.setFullYear(parseInt(newYear));
    setMonth(newDate);
    onMonthYearChange?.(newDate);
    setYearSearch("");
    setIsYearOpen(false);
  };

  const incrementMonth = () => {
    const newDate = new Date(month);
    newDate.setMonth(newDate.getMonth() + 1);
    setMonth(newDate);
    onMonthYearChange?.(newDate);
  };

  const decrementMonth = () => {
    const newDate = new Date(month);
    newDate.setMonth(newDate.getMonth() - 1);
    setMonth(newDate);
    onMonthYearChange?.(newDate);
  };

  return (
    <div className="p-3 bg-teal-50">
      <div className="flex justify-between items-center mb-2 gap-2">
        <div className="flex items-center gap-2">
          <button
            onClick={decrementMonth}
            className="p-1 hover:bg-teal-100 rounded"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <Select
            value={format(month, "MMMM")}
            onValueChange={handleMonthChange}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <button
            onClick={incrementMonth}
            className="p-1 hover:bg-teal-100 rounded"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="relative">
          <Select
            value={month.getFullYear().toString()}
            onValueChange={handleYearChange}
            open={isYearOpen}
            onOpenChange={setIsYearOpen}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <div className="sticky top-0 p-2 bg-white border-b">
                <div className="flex items-center gap-2 px-2 py-1 bg-teal-50 rounded">
                  <Search className="h-4 w-4 text-teal-500" />
                  <Input
                    value={yearSearch}
                    onChange={(e) => setYearSearch(e.target.value)}
                    className="border-none bg-transparent h-6 p-0 text-sm focus-visible:ring-0"
                    placeholder="Search year..."
                  />
                </div>
              </div>
              <div className="max-h-[200px] overflow-y-auto bg-teal-50">
                {filteredYears.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </div>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("", className)}
        classNames={{
          months: "flex flex-col space-y-4",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium hidden",
          nav: "hidden",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-teal-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          day_selected: "bg-teal-500 text-white hover:bg-teal-500 hover:text-white focus:bg-teal-500 focus:text-white",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        month={month}
        onMonthChange={setMonth}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
