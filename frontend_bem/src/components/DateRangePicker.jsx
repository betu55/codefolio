import { useEffect, useMemo, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaRegCalendarAlt } from "react-icons/fa";
import {
  formatDateKey,
  formatDateRangeLabel,
  parseDateRange,
  serializeDateRange,
} from "../utils/dateRange";
import Button from "./Button";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);

const isSameDay = (firstDate, secondDate) =>
  Boolean(firstDate) &&
  Boolean(secondDate) &&
  firstDate.getFullYear() === secondDate.getFullYear() &&
  firstDate.getMonth() === secondDate.getMonth() &&
  firstDate.getDate() === secondDate.getDate();

const isDateBetween = (date, startDate, endDate) => {
  if (!startDate || !endDate) {
    return false;
  }

  const dateKey = formatDateKey(date);
  const startKey = formatDateKey(startDate);
  const endKey = formatDateKey(endDate);

  return dateKey > startKey && dateKey < endKey;
};

const buildMonthGrid = (monthDate) => {
  const firstDayOfMonth = startOfMonth(monthDate);
  const daysInMonth = new Date(
    monthDate.getFullYear(),
    monthDate.getMonth() + 1,
    0
  ).getDate();

  const cells = [];

  for (let index = 0; index < firstDayOfMonth.getDay(); index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(monthDate.getFullYear(), monthDate.getMonth(), day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
};

const DateRangePicker = ({
  value,
  onChange,
  label = "Date range",
  placeholder = "Select date range",
}) => {
  const pickerRef = useRef(null);
  const parsedRange = useMemo(() => parseDateRange(value), [value]);
  const selectedStartDate = parsedRange.startDate;
  const selectedStartTime = selectedStartDate ? selectedStartDate.getTime() : null;
  const [pickerMode, setPickerMode] = useState("calendar");
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    startOfMonth(parsedRange.startDate || new Date())
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1970 + 1},
    (_, index) => 1970 + index,
  );

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  useEffect(() => {
    if (selectedStartDate) {
      setVisibleMonth(startOfMonth(selectedStartDate));
    }
  }, [selectedStartDate, selectedStartTime]);

  const handleClose = () => {
    setIsOpen(false);
    setPickerMode("calendar");
  }

  const handleDayClick = (day) => {
    const { startDate, endDate } = parsedRange;

    if (!startDate || endDate) {
      onChange(serializeDateRange(day, null));
      return;
    }

    if (formatDateKey(day) < formatDateKey(startDate)) {
      onChange(serializeDateRange(day, startDate));
      return;
    }

    onChange(serializeDateRange(startDate, day));
  };

  const clearRange = () => {
    onChange("");
    setVisibleMonth(startOfMonth(new Date()));
    setIsOpen(false);
  };

  const monthCells = buildMonthGrid(visibleMonth);
  const monthLabel = visibleMonth.toLocaleDateString("en-CA", {
    month: "long",
    year: "numeric",
  });

  const hasSelectedRange = value != null && value !== "" && value !== "|" && value !== "null|null";

  return (
    <div className="relative" ref={pickerRef}>
      <span className="mb-2 block">{label}</span>
      <Button
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex w-full items-center justify-between rounded-xl border border-brand-border_dark bg-transparent px-4 py-2 text-left dark:border-brand-border_light"
      >
        <span
          className={
            hasSelectedRange
              ? "text-brand-dark_txt dark:text-brand-light_txt"
              : "text-brand-dark_txt_accent/60 italic dark:text-brand-light_txt/40"
          }
        >
          {formatDateRangeLabel(value, placeholder)}
        </span>
        <FaRegCalendarAlt className="shrink-0 text-brand-mac_close dark:text-brand-mac_close_dark" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/35 px-4 py-6">
          <div className="w-full max-w-md rounded-2xl h-[33rem] border border-brand-border_dark bg-brand-light_bg p-4 shadow-xl dark:border-brand-border_light dark:bg-brand-dark_bg">
            <div className="mb-4 flex items-center justify-between">
              <div className="mr-2 flex items-center justify-between w-full">
                <Button
                  onClick={() =>
                    setVisibleMonth(
                      (currentMonth) =>
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1,
                          1,
                        ),
                    )
                  }
                  className="out-button inline-flex h-9 w-9 items-center justify-center text-center rounded-lg"
                  aria-label="Previous month"
                >
                  <FaChevronLeft />
                </Button>

                <Button
                  type="button"
                  onClick={() => {
                    pickerMode === "calendar" ? setPickerMode("month-year") : setPickerMode("calendar");
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-semibold uppercase tracking-[0.18em] hover:bg-brand-mac_minimize/30 dark:hover:bg-brand-mac_minimize/20 transition-colors duration-100 ease-in-out"
                >
                  {monthLabel}
                </Button>

                <Button
                  onClick={() =>
                    setVisibleMonth(
                      (currentMonth) =>
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1,
                          1,
                        ),
                    )
                  }
                  className="out-button inline-flex h-9 w-9 items-center justify-center text-center rounded-lg"
                  aria-label="Next month"
                >
                  <FaChevronRight />
                </Button>
              </div>
              <Button
                onClick={() => handleClose()}
                className="delete-btn px-4 py-4"
              >
                ×
              </Button>
            </div>

            <div
              className={
                hasSelectedRange
                  ? "text-brand-dark_txt/70 dark:text-brand-light_txt/70 w-full text-center mb-4 italic"
                  : "text-brand-dark_txt_accent/60 italic dark:text-brand-light_txt/40 w-full text-center mb-4 italic"
              }
            >
              {formatDateRangeLabel(value, placeholder)}
            </div>

            {pickerMode === "calendar" ? (
              <>
                <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm uppercase tracking-[0.16em] text-brand-dark_txt_accent dark:text-brand-light_txt/70">
                  {weekDays.map((weekDay) => (
                    <span key={weekDay} className="py-2">
                      {weekDay}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {monthCells.map((day, index) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="h-11 rounded-xl"
                        />
                      );
                    }

                    const isStart = isSameDay(day, parsedRange.startDate);
                    const isEnd = isSameDay(day, parsedRange.endDate);
                    const isInRange = isDateBetween(
                      day,
                      parsedRange.startDate,
                      parsedRange.endDate,
                    );
                    const isBound = isStart || isEnd;

                    return (
                      <Button
                        key={formatDateKey(day)}
                        onClick={() => handleDayClick(day)}
                        className={[
                          "h-10 rounded-xl border-t border-brand-border_dark/50 dark:border-brand-border_light text-sm transition text-center flex items-center justify-center",
                          isBound
                            ? "bg-brand-mac_close text-white dark:bg-brand-mac_close_dark"
                            : isInRange
                              ? "bg-brand-mac_maximize/60 dark:bg-brand-mac_minimize/10"
                              : "hover:bg-brand-mac_maximize/60 dark:hover:bg-brand-mac_minimize/20",
                        ].join(" ")}
                      >
                        {day.getDate()}
                      </Button>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="grid gap-4">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.18em] text-brand-dark_txt_accent dark:text-brand-light_txt/70">
                    Select Month
                  </p>

                  <div className="grid grid-cols-4 gap-2">
                    {months.map((month, index) => (
                      <Button
                        key={month}
                        type="button"
                        onClick={() => {
                          setVisibleMonth(
                            new Date(visibleMonth.getFullYear(), index, 1),
                          );
                        }}
                        className={[
                          "rounded-xl px-3 py-2 text-sm",
                          visibleMonth.getMonth() === index
                            ? "bg-brand-mac_close text-white"
                            : "out-button",
                        ].join(" ")}
                      >
                        {month}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.18em] text-brand-dark_txt_accent dark:text-brand-light_txt/70">
                    Select Year
                  </p>

                  <div className="grid max-h-44 grid-cols-4 gap-2 overflow-y-auto pr-1">
                    {years.map((year) => (
                      <Button
                        key={year}
                        type="button"
                        onClick={() => {
                          setVisibleMonth(
                            new Date(year, visibleMonth.getMonth(), 1),
                          );
                          setPickerMode("calendar");
                        }}
                        className={[
                          "rounded-xl px-3 py-2 text-sm",
                          visibleMonth.getFullYear() === year
                            ? "bg-brand-mac_close text-white"
                            : "out-button",
                        ].join(" ")}
                      >
                        {year}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="px-2 mt-4 flex items-center justify-between gap-3 border-t border-brand-border_dark/40 pt-4 text-sm dark:border-brand-border_light/40">
              <p className="text-brand-dark_txt_accent dark:text-brand-light_txt/70">
                Click once for the start date, then again for the end date.
              </p>
              <Button
                onClick={() => setIsOpen(false)}
                className="out-button px-4 py-2"
              >
                Ok
              </Button>
              <Button onClick={clearRange} className="out-button px-4 py-2">
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
