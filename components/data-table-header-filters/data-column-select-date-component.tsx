import { Column } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import {
  CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  DatePicker,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import DataColumnClearButton from "../data-column-clear-button";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export function DataColumnSelectDateComponent<TData, TValue>({
  column,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const now = today(getLocalTimeZone());

  const [date, setDate] = useQueryState<
    { from?: string; to?: string } | undefined
  >(column.id, {
    clearOnDefault: true,
    defaultValue: undefined,
    serialize: (value) =>
      value && (value.from || value.to)
        ? `${value.from}${value.to ? `,${value.to}` : ""}`
        : "",
    parse: (value) => {
      if (!value || value === "undefined") return undefined;
      const [from, to] = value.split(",");
      return { from, to };
    },
  });

  const calendarFromDate: CalendarDate | undefined = date?.from
    ? parseDate(date?.from)
    : undefined;

  const calendarToDate: CalendarDate | undefined = date?.to
    ? parseDate(date.to)
    : undefined;

  return (
    <div className={cn("flex flex-col w-full gap-2", className)}>
      <DatePicker
        className="space-y-2"
        value={calendarFromDate || null}
        maxValue={calendarToDate || now}
        shouldCloseOnSelect={true}
        onChange={(selectedDate) => {
          setDate({
            from: selectedDate?.toString(),
            to: date?.to,
          });
          column.setFilterValue([selectedDate?.toString(), date?.to]);
        }}
      >
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-foreground w-12">
            From
          </Label>
          <Group className="inline-flex text-slate-700 h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2">
            {date?.from || "yyyy-mm-dd"}
          </Group>
          <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:text-foreground data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2">
            <CalendarIcon size={16} strokeWidth={2} />
          </Button>
        </div>
        <Popover
          className="z-50 rounded-lg border border-input bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar className="w-fit">
              <header className="flex w-full items-center gap-1 pb-1">
                <Button
                  slot="previous"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:text-foreground data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </Button>
                <Heading className="grow text-center text-sm font-medium" />
                <Button
                  slot="next"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:text-foreground data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </Button>
              </header>
              <CalendarGrid>
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody className="[&_td]:px-0">
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className={cn(
                        "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground ring-offset-background transition-shadow focus-visible:outline-none data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[focus-visible]:border-ring data-[hovered]:bg-accent data-[selected]:bg-primary data-[hovered]:text-foreground data-[selected]:text-primary-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground",
                        date.compare(now) === 0 &&
                          "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selected]:after:bg-background"
                      )}
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
      <DatePicker
        className="space-y-2"
        isDisabled={!date?.from}
        minValue={calendarFromDate || undefined}
        maxValue={now}
        value={calendarToDate || undefined}
        onChange={(selectedDate) => {
          setDate({
            from: date?.from?.toString() || "",
            to: selectedDate?.toString(),
          });
          column.setFilterValue([date?.from, selectedDate?.toString()]);
        }}
      >
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium text-foreground w-12">
            To:
          </Label>
          <Group className="inline-flex text-slate-700 h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input bg-background px-3 py-2 pe-9 text-sm shadow-sm shadow-black/5 ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2">
            {date?.to || "yyyy-mm-dd"}
          </Group>
          <Button className="z-10 -me-px -ms-9 flex w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:text-foreground data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2">
            <CalendarIcon size={16} strokeWidth={2} />
          </Button>
        </div>
        <Popover
          className="z-50 rounded-lg border border-input bg-background text-popover-foreground shadow-lg shadow-black/5 outline-none data-[entering]:animate-in data-[exiting]:animate-out data-[entering]:fade-in-0 data-[exiting]:fade-out-0 data-[entering]:zoom-in-95 data-[exiting]:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2"
          offset={4}
        >
          <Dialog className="max-h-[inherit] overflow-auto p-2">
            <Calendar className="w-fit">
              <header className="flex w-full items-center gap-1 pb-1">
                <Button
                  slot="previous"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:text-foreground data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2"
                >
                  <ChevronLeft size={16} strokeWidth={2} />
                </Button>
                <Heading className="grow text-center text-sm font-medium" />
                <Button
                  slot="next"
                  className="flex size-9 items-center justify-center rounded-lg text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground focus-visible:outline-none data-[focus-visible]:border data-[focus-visible]:border-ring data-[focus-visible]:text-foreground data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2"
                >
                  <ChevronRight size={16} strokeWidth={2} />
                </Button>
              </header>
              <CalendarGrid>
                <CalendarGridHeader>
                  {(day) => (
                    <CalendarHeaderCell className="size-9 rounded-lg p-0 text-xs font-medium text-muted-foreground/80">
                      {day}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody className="[&_td]:px-0">
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className={cn(
                        "relative flex size-9 items-center justify-center whitespace-nowrap rounded-lg border border-transparent p-0 text-sm font-normal text-foreground ring-offset-background transition-shadow focus-visible:outline-none data-[disabled]:pointer-events-none data-[unavailable]:pointer-events-none data-[focus-visible]:z-10 data-[focus-visible]:border-ring data-[hovered]:bg-accent data-[selected]:bg-primary data-[hovered]:text-foreground data-[selected]:text-primary-foreground data-[unavailable]:line-through data-[disabled]:opacity-30 data-[unavailable]:opacity-30 data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-ring/30 data-[focus-visible]:ring-offset-2 data-[invalid]:data-[selected]:[&:not([data-hover])]:bg-destructive data-[invalid]:data-[selected]:[&:not([data-hover])]:text-destructive-foreground",
                        date.compare(now) === 0 &&
                          "after:pointer-events-none after:absolute after:bottom-1 after:start-1/2 after:z-10 after:size-[3px] after:-translate-x-1/2 after:rounded-full after:bg-primary data-[selected]:after:bg-background"
                      )}
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
      <DataColumnClearButton
        isDisabled={!date?.from && !date?.to}
        onClick={() => {
          setDate(null);
          column.setFilterValue("");
        }}
      />
    </div>
  );
}
